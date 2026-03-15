import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addSubtask, toggleSubtask } from '../redux/taskSlice'

function getDueDateStatus(dueDate) {
  if (!dueDate) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(dueDate + 'T00:00:00')
  const diffDays = Math.round((due - today) / 86400000)
  if (diffDays < 0)  return { label: '⚠ Overdue',      style: 'text-red-500' }
  if (diffDays === 0) return { label: '⚠ Due Today',    style: 'text-orange-500' }
  if (diffDays === 1) return { label: '⚠ Due Tomorrow', style: 'text-yellow-500' }
  return {
    label: 'Due: ' + due.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    style: 'text-gray-400',
  }
}

const TAG_COLORS = [
  'bg-purple-100 text-purple-600',
  'bg-blue-100 text-blue-600',
  'bg-green-100 text-green-600',
  'bg-pink-100 text-pink-600',
  'bg-yellow-100 text-yellow-700',
  'bg-orange-100 text-orange-600',
]

const DIFFICULTY_STYLES = {
  Easy:   'bg-green-50 text-green-600',
  Medium: 'bg-yellow-50 text-yellow-700',
  Hard:   'bg-red-50 text-red-500',
}

function tagColor(str) {
  let n = 0
  for (let i = 0; i < str.length; i++) n += str.charCodeAt(i)
  return TAG_COLORS[n % TAG_COLORS.length]
}

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
  const { id, priority, title, description, avatars, comments, files, subtasks = [], dueDate = null, customFields = {} } = task
  const dispatch = useDispatch()
  const [expanded, setExpanded] = useState(false)
  const [input, setInput] = useState('')

  const completed = subtasks.filter((s) => s.completed).length
  const total = subtasks.length
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0
  const dueDateStatus = getDueDateStatus(dueDate)

  function handleAdd() {
    const text = input.trim()
    if (!text) return
    dispatch(addSubtask({ taskId: id, text }))
    setInput('')
    setExpanded(true)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3">
      {/* Priority */}
      <span className={`self-start text-xs font-medium px-2.5 py-1 rounded-lg ${PRIORITY_STYLES[priority] ?? 'bg-gray-100 text-gray-500'}`}>
        {priority}
      </span>

      {/* Title, description & due date */}
      <div>
        <p className="text-sm font-semibold text-gray-800 mb-1">{title}</p>
        {description && (
          <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
        )}
        {dueDateStatus && (
          <p className={`text-xs font-medium mt-1.5 ${dueDateStatus.style}`}>
            {dueDateStatus.label}
          </p>
        )}
      </div>

      {/* Custom field badges */}
      {(customFields.tag || customFields.difficulty || customFields.category) && (
        <div className="flex flex-wrap gap-1.5">
          {customFields.tag && (
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${tagColor(customFields.tag)}`}>
              {customFields.tag}
            </span>
          )}
          {customFields.category && (
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${tagColor(customFields.category)}`}>
              {customFields.category}
            </span>
          )}
          {customFields.difficulty && (
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${DIFFICULTY_STYLES[customFields.difficulty] ?? 'bg-gray-100 text-gray-500'}`}>
              {customFields.difficulty}
            </span>
          )}
        </div>
      )}

      {/* Subtasks section */}
      <div className="flex flex-col gap-2">
        {/* Progress header — clickable to expand */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center justify-between w-full group"
        >
          <span className="text-xs text-gray-500 font-medium">
            Subtasks{total > 0 ? ` · ${completed}/${total} done` : ''}
          </span>
          <svg
            className={`w-3.5 h-3.5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Progress bar */}
        {total > 0 && (
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Expanded subtask list + add input */}
        {expanded && (
          <div className="flex flex-col gap-1.5 mt-1">
            {subtasks.map((s) => (
              <label key={s.id} className="flex items-center gap-2 cursor-pointer group/item">
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

            {/* Add subtask input */}
            <div className="flex items-center gap-1.5 mt-1">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add subtask..."
                className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-colors"
              />
              <button
                onClick={handleAdd}
                disabled={!input.trim()}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        {/* Avatars */}
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

        {/* Stats */}
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
