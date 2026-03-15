import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../redux/taskSlice'

const INITIAL = { title: '', description: '', priority: 'Low', dueDate: '', tag: '' }

function getTodayString() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export default function AddTaskModal({ columnId, onClose }) {
  const dispatch = useDispatch()
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const today = getTodayString()

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const next = {}
    if (!form.title.trim()) next.title = 'Task title is required.'
    if (form.dueDate && form.dueDate < today) next.dueDate = 'Due date cannot be in the past.'
    if (Object.keys(next).length) { setErrors(next); return }
    dispatch(
      addTask({
        id: crypto.randomUUID(),
        title: form.title.trim(),
        description: form.description.trim() || null,
        priority: form.priority,
        status: columnId,
        avatars: [],
        comments: 0,
        files: 0,
        dueDate: form.dueDate || null,
        subtasks: [],
        tag: form.tag.trim() || null,
      })
    )
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Add New Task</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className={`w-full px-3 py-2 text-sm rounded-xl border outline-none transition-colors
                ${errors.title ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:ring-2 focus:ring-purple-200 focus:border-purple-400'}`}
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter task description (optional)"
              rows={3}
              className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none resize-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-colors"
            />
          </div>

          {/* Priority */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-colors bg-white"
            >
              <option value="Low">Low</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Due Date */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              min={today}
              onChange={handleChange}
              className={`w-full px-3 py-2 text-sm rounded-xl border outline-none transition-colors bg-white
                ${errors.dueDate ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:ring-2 focus:ring-purple-200 focus:border-purple-400'}`}
            />
            {errors.dueDate && <p className="text-xs text-red-500">{errors.dueDate}</p>}
          </div>

          {/* Tag */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Tag</label>
            <input
              name="tag"
              value={form.tag}
              onChange={handleChange}
              placeholder="e.g. UI, Backend"
              className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-colors"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 text-sm font-semibold text-white bg-purple-600 rounded-xl hover:bg-purple-700 transition-colors"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
