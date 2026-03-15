import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext } from '@hello-pangea/dnd'
import { moveTask } from '../redux/taskSlice'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Column from '../components/Column'
import FilterBar from '../components/FilterBar'
import LogoutButton from '../components/LogoutButton'

const TEAM_AVATARS = [
  { id: 'PJ', img: 'https://i.pravatar.cc/150?img=47' },
  { id: 'AK', img: 'https://i.pravatar.cc/150?img=12' },
  { id: 'SR', img: 'https://i.pravatar.cc/150?img=32' },
  { id: 'MV', img: 'https://i.pravatar.cc/150?img=56' },
  { id: 'RD', img: 'https://i.pravatar.cc/150?img=68' },
]

const COLUMN_META = [
  { id: 'todo',       title: 'To Do' },
  { id: 'inProgress', title: 'On Progress' },
  { id: 'done',       title: 'Done' },
]

export default function Dashboard() {
  const tasks = useSelector((state) => state.tasks)
  const filter = useSelector((state) => state.filter.filter)
  const dispatch = useDispatch()
  const [todayFilter, setTodayFilter] = useState(false)

  const todayStr = new Date().toLocaleDateString('en-CA') // YYYY-MM-DD in local time
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const allTasks = Object.values(tasks).flat()
  const hasOverdue = allTasks.some(
    (t) => t.dueDate && new Date(t.dueDate + 'T00:00:00') < today
  )
  const uniqueTags = [...new Set(allTasks.map((t) => t.tag).filter(Boolean))]

  function getFilteredTasks(columnId, columnTasks) {
    let result = columnTasks
    if (filter === 'completed') result = columnId === 'done' ? result : []
    else if (filter === 'high') result = result.filter((t) => t.priority === 'High')
    else if (filter === 'low')  result = result.filter((t) => t.priority === 'Low')
    else if (uniqueTags.includes(filter)) result = result.filter((t) => t.tag === filter)
    if (todayFilter) result = result.filter((t) => t.dueDate === todayStr)
    return result
  }

  function handleDragEnd(result) {
    const { source, destination, draggableId } = result
    if (!destination) return
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return
    dispatch(moveTask({
      taskId: draggableId,
      sourceColumn: source.droppableId,
      destinationColumn: destination.droppableId,
      destinationIndex: destination.index,
    }))
  }
  return (
    <div className="min-h-screen w-screen flex font-sans" style={{ backgroundColor: '#f5f5f5' }}>
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 w-full flex flex-col min-w-0">
        <Navbar />

        <main className="flex-1 p-6 flex flex-col gap-6 overflow-auto">
          {/* Overdue banner */}
          {hasOverdue && (
            <div className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-medium">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              You have overdue tasks
            </div>
          )}
          {/* Page header */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h1 className="text-4xl font-black tracking-tight text-gray-900">Mobile App</h1>
                {/* Edit icon */}
                <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                {/* Link/share icon */}
                <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </button>
              </div>

              {/* Filter / Today / Logout buttons */}
              <div className="flex items-center gap-2 mt-1">
                <FilterBar tags={uniqueTags} />
                <button
                  onClick={() => setTodayFilter((v) => !v)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors
                    ${todayFilter
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Today
                </button>
                <LogoutButton />
              </div>
            </div>

            {/* Right: Invite + team avatars */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {TEAM_AVATARS.map((av) => (
                  <img
                    key={av.id}
                    src={av.img}
                    alt={av.id}
                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                  />
                ))}
              </div>
              <button className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 text-white text-xs font-semibold rounded-xl hover:bg-purple-700 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Invite
              </button>
            </div>
          </div>

          {/* Kanban board */}
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex gap-6 w-full items-start overflow-x-auto">
              {COLUMN_META.map((col) => (
                <Column
                  key={col.id}
                  id={col.id}
                  title={col.title}
                  tasks={tasks[col.id]}
                  filteredTasks={getFilteredTasks(col.id, tasks[col.id])}
                />
              ))}
            </div>
          </DragDropContext>
        </main>
      </div>
    </div>
  )
}
