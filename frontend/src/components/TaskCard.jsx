import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleSubtask } from '../redux/taskSlice'

const PRIORITY_STYLES = {
  Low: 'bg-blue-50 text-blue-500',
  High: 'bg-orange-50 text-orange-500',
  Completed: 'bg-green-50 text-green-500',
}

const AVATAR_COLORS = [
  'bg-purple-400',
  'bg-pink-400',
  'bg-yellow-400',
  'bg-green-400',
  'bg-blue-400',
]

export default function TaskCard({ task }) {
  const { id, priority, title, description, avatars, comments, files, subtasks = [] } = task
  const dispatch = useDispatch()
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3">
      {/* Priority */}
      <span className={`self-start text-xs font-medium px-2.5 py-1 rounded-lg ${PRIORITY_STYLES[priority] ?? 'bg-gray-100 text-gray-500'}`}>
        {priority}
      </span>

      {/* Title & description */}
      <div>
        <p className="text-sm font-semibold text-gray-800 mb-1">{title}</p>
        {description && (
          <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
        )}
      </div>

      {/* Subtasks section */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center justify-between w-full"
        >
          <span className="text-xs text-gray-500 font-medium">
            Subtasks{subtasks.length > 0 ? ` · ${subtasks.length} total` : ''}
          </span>
          <svg
            className={`w-3.5 h-3.5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expanded && subtasks.length > 0 && (
          <div className="flex flex-col gap-1.5 mt-1">
            {subtasks.map((s) => (
              <label key={s.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={s.completed}
                  onChange={() => dispatch(toggleSubtask({ taskId: id, subtaskId: s.id }))}
                  className="w-3.5 h-3.5 rounded accent-purple-500 cursor-pointer flex-shrink-0"
                />
                <span className={`text-xs leading-relaxed ${s.completed ? 'line-through text-gray-300' : 'text-gray-600'}`}>
                  {s.text}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex -space-x-2">
          {avatars.map((initials, i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]} border-2 border-white flex items-center justify-center text-white text-[9px] font-bold`}
            >
              {initials}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <span className="flex items-center gap-1 text-xs">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.84L3 20l1.09-3.27A7.93 7.93 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {comments}
          </span>
          <span className="flex items-center gap-1 text-xs">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828L18 9.828A4 4 0 1012.343 4.1L5.757 10.686a6 6 0 108.485 8.485L20.5 12.9" />
            </svg>
            {files}
          </span>
        </div>
      </div>
    </div>
  )
}
