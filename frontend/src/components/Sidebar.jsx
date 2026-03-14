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
  { name: 'Mobile App', color: 'bg-purple-500', active: true },
  { name: 'Website Redesign', color: 'bg-green-400', active: false },
  { name: 'Design System', color: 'bg-orange-400', active: false },
  { name: 'Wireframes', color: 'bg-pink-400', active: false },
]

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-50 border-r border-gray-200 flex flex-col px-4 py-6 shrink-0">
      {/* Project name */}
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center">
          <span className="text-white text-xs font-bold">P</span>
        </div>
        <span className="font-semibold text-gray-800 text-sm">TaskBoard</span>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-1 mb-8">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
              ${item.label === 'Tasks'
                ? 'bg-purple-100 text-purple-700 font-medium'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* My Projects */}
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-3 mb-3">
        My Projects
      </p>
      <div className="flex flex-col gap-1 mb-auto">
        {projects.map((p) => (
          <button
            key={p.name}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
              ${p.active
                ? 'bg-purple-100 text-purple-700 font-medium'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${p.color} shrink-0`} />
            {p.name}
          </button>
        ))}
      </div>

      {/* Bottom card */}
      <div className="mt-6 bg-purple-600 rounded-2xl p-4 text-white">
        <p className="font-semibold text-sm mb-1">Thoughts Time</p>
        <p className="text-xs text-purple-200 mb-3 leading-relaxed">
          Got ideas? Share them with your team and keep everyone aligned.
        </p>
        <button className="w-full bg-white text-purple-700 text-xs font-semibold py-2 rounded-lg hover:bg-purple-50 transition-colors">
          Write a message
        </button>
      </div>
    </aside>
  )
}
