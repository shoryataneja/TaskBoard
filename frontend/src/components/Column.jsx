import { useState } from 'react'
import TaskCard from './TaskCard'
import AddTaskModal from './AddTaskModal'

const ACCENT = {
  todo: 'bg-purple-500',
  inProgress: 'bg-orange-400',
  done: 'bg-green-500',
}

export default function Column({ id, title, tasks }) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="flex-1 min-w-0 flex flex-col gap-3">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className={`h-1 w-full rounded-full ${ACCENT[id]} mb-3`} />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-800">{title}</span>
            <span className="text-xs bg-gray-100 text-gray-500 font-medium px-2 py-0.5 rounded-full">
              {tasks.length}
            </span>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700 transition-colors text-sm leading-none"
          >
            +
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {modalOpen && <AddTaskModal columnId={id} onClose={() => setModalOpen(false)} />}
    </div>
  )
}
