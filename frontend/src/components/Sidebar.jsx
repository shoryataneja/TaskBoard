const menuItems = [
  {
    label: 'Home',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4.5 10.5V20a.5.5 0 00.5.5h5v-5h5v5h5a.5.5 0 00.5-.5v-9.5" />
      </svg>
    ),
  },
  {
    label: 'Messages',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.84L3 20l1.09-3.27A7.93 7.93 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    label: 'Tasks',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: 'Members',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4.13a4 4 0 11-8 0 4 4 0 018 0zm6 0a4 4 0 11-2-3.46" />
      </svg>
    ),
  },
  {
    label: 'Settings',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

const projects = [
  { name: 'Mobile App',       color: '#8bc364', active: true  },
  { name: 'Website Redesign', color: '#f2a93b', active: false },
  { name: 'Design System',    color: '#e0cdfa', active: false },
  { name: 'Wireframes',       color: '#80a4e4', active: false },
]

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col px-4 py-6 shrink-0">
      {/* Branding */}
      <div className="flex items-center gap-2.5 mb-8 px-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#4b31dc' }}>
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
          </svg>
        </div>
        <span className="font-extrabold tracking-tight text-2xl" style={{ color: '#0c062b' }}>Project M.</span>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-0.5 mb-8">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors
              ${item.label === 'Tasks'
                ? 'bg-purple-50 text-purple-700 font-semibold'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* My Projects */}
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest px-3 mb-2">
        My Projects
      </p>
      <div className="flex flex-col gap-0.5 mb-auto">
        {projects.map((p) => (
          <button
            key={p.name}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors
              ${p.active
                ? 'bg-purple-50 text-purple-700 font-semibold'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
          >
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
            {p.name}
          </button>
        ))}
      </div>

      {/* Thoughts Time card */}
      <div className="mt-6 rounded-2xl p-5 text-center overflow-hidden relative bg-white border border-gray-100 shadow-sm">
        {/* Lightbulb icon */}
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#fef9ec' }}>
          <svg className="w-6 h-6" fill="none" stroke="#f3cd4a" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>

        <p className="font-bold text-sm mb-1.5" style={{ color: '#0c062b' }}>Thoughts Time</p>
        <p className="text-[11px] mb-4 leading-relaxed px-1" style={{ color: '#777485' }}>
          Got ideas? Share them with your team and keep everyone aligned.
        </p>
        <button
          className="w-full text-xs font-bold py-2.5 rounded-xl transition-colors"
          style={{ backgroundColor: '#4b31dc', color: '#ffffff' }}
        >
          Write a message
        </button>
      </div>
    </aside>
  )
}
