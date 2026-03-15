import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext } from '@hello-pangea/dnd'
import { moveTask } from '../redux/taskSlice'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Column from '../components/Column'
import FilterBar from '../components/FilterBar'
import LogoutButton from '../components/LogoutButton'

const TEAM_AVATARS = ['PJ', 'AK', 'SR', 'MV', 'RD']
const AVATAR_COLORS = ['bg-purple-400', 'bg-pink-400', 'bg-yellow-400', 'bg-green-400', 'bg-blue-400']

const COLUMN_META = [
  { id: 'todo',       title: 'To Do' },
  { id: 'inProgress', title: 'On Progress' },
  { id: 'done',       title: 'Done' },
]

export default function Dashboard() {
  const tasks = useSelector((state) => state.tasks)
  const filter = useSelector((state) => state.filter.filter)
  const dispatch = useDispatch()

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const allTasks = Object.values(tasks).flat()
  const hasOverdue = allTasks.some(
    (t) => t.dueDate && new Date(t.dueDate + 'T00:00:00') < today
  )
  const uniqueTags = [...new Set(allTasks.map((t) => t.tag).filter(Boolean))]

  function getFilteredTasks(columnId, columnTasks) {
    if (filter === 'all') return columnTasks
    if (filter === 'completed') return columnId === 'done' ? columnTasks : []
    if (filter === 'high') return columnTasks.filter((t) => t.priority === 'High')
    if (filter === 'low') return columnTasks.filter((t) => t.priority === 'Low')
    if (uniqueTags.includes(filter)) return columnTasks.filter((t) => t.tag === filter)
    return columnTasks
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
    <div className="min-h-screen w-screen bg-gray-100 flex font-sans">
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
                <h1 className="text-3xl font-semibold text-gray-900">Mobile App</h1>
                {/* Action icons */}
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>

              {/* Filter / Today / Logout buttons */}
              <div className="flex items-center gap-2 mt-1">
                <FilterBar tags={uniqueTags} />
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
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
                {TEAM_AVATARS.map((initials, i) => (
                  <div
                    key={initials}
                    className={`w-8 h-8 rounded-full ${AVATAR_COLORS[i]} border-2 border-white flex items-center justify-center text-white text-[10px] font-bold`}
                  >
                    {initials}
                  </div>
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
