import { useState } from 'react'
import { Droppable, Draggable } from '@hello-pangea/dnd'
import TaskCard from './TaskCard'
import AddTaskModal from './AddTaskModal'

const ACCENT = {
  todo:       '#4a90d9',
  inProgress: '#f2a93b',
  done:       '#5cb85c',
}

export default function Column({ id, title, tasks, filteredTasks }) {
  const [modalOpen, setModalOpen] = useState(false)
  const isFiltered = filteredTasks.length !== tasks.length

  return (
    <div className="flex-1 min-w-0 flex flex-col gap-3">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-800">{title}</span>
            <span className="text-xs bg-gray-100 text-gray-500 font-semibold px-2 py-0.5 rounded-full">
              {filteredTasks.length}
            </span>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="w-6 h-6 rounded-full text-white flex items-center justify-center transition-colors text-sm leading-none"
            style={{ backgroundColor: ACCENT[id] }}
          >
            +
          </button>
        </div>
        <div className={`h-1.5 w-full rounded-full mt-3`} style={{ backgroundColor: ACCENT[id] }} />
      </div>

      {/* Cards */}
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col gap-3 min-h-[4rem] rounded-2xl transition-colors
              ${snapshot.isDraggingOver ? 'bg-purple-50' : ''}`}
          >
            {tasks.map((task, index) => {
              const visible = !isFiltered || filteredTasks.some((t) => String(t.id) === String(task.id))
              return (
                <Draggable key={String(task.id)} draggableId={String(task.id)} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        opacity: snapshot.isDragging ? 0.85 : 1,
                        display: visible ? undefined : 'none',
                      }}
                    >
                      <TaskCard task={task} />
                    </div>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {modalOpen && <AddTaskModal columnId={id} onClose={() => setModalOpen(false)} />}
    </div>
  )
}
