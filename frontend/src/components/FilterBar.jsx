import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../redux/filterSlice'

const OPTIONS = [
  { value: 'all',       label: 'All' },
  { value: 'high',      label: 'High Priority' },
  { value: 'low',       label: 'Low Priority' },
  { value: 'completed', label: 'Completed' },
]

export default function FilterBar() {
  const dispatch = useDispatch()
  const active = useSelector((state) => state.filter.filter)
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const activeLabel = OPTIONS.find((o) => o.value === active)?.label ?? 'All'
  const isFiltered = active !== 'all'

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors
          ${isFiltered
            ? 'bg-purple-600 text-white border-purple-600'
            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
        </svg>
        {isFiltered ? activeLabel : 'Filter'}
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1.5 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1 overflow-hidden">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { dispatch(setFilter(opt.value)); setOpen(false) }}
              className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors
                ${active === opt.value
                  ? 'bg-purple-50 text-purple-700'
                  : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {opt.label}
              {active === opt.value && (
                <span className="float-right text-purple-600">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
