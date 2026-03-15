import { createSlice } from '@reduxjs/toolkit'

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    todo: [
      {
        id: 1,
        priority: 'Low',
        title: 'Brainstorming',
        description: 'Brainstorming brings team members together to generate creative ideas.',
        avatars: ['AK', 'SR', 'MV'],
        comments: 12,
        files: 0,
        subtasks: [],
      },
      {
        id: 2,
        priority: 'High',
        title: 'Research',
        description: 'User research helps you to create an optimal product for users.',
        avatars: ['PJ', 'RD'],
        comments: 10,
        files: 3,
        subtasks: [],
      },
      {
        id: 3,
        priority: 'High',
        title: 'Wireframes',
        description: null,
        avatars: ['AK', 'MV', 'SR', 'PJ'],
        comments: 8,
        files: 2,
        subtasks: [],
      },
    ],
    inProgress: [
      {
        id: 4,
        priority: 'Low',
        title: 'Onboarding Illustrations',
        description: null,
        avatars: ['SR', 'PJ'],
        comments: 14,
        files: 15,
        subtasks: [],
      },
      {
        id: 5,
        priority: 'Low',
        title: 'Moodboard',
        description: null,
        avatars: ['AK', 'RD', 'MV'],
        comments: 9,
        files: 10,
        subtasks: [],
      },
    ],
    done: [
      {
        id: 6,
        priority: 'Completed',
        title: 'Design System',
        description: 'It just needs to adapt the UI from what you did before.',
        avatars: ['PJ', 'AK'],
        comments: 12,
        files: 15,
        subtasks: [],
      },
      {
        id: 7,
        priority: 'Completed',
        title: 'Sticky Notes',
        description: "We need to make it clear what's important.",
        avatars: ['SR', 'MV', 'RD'],
        comments: 9,
        files: 4,
        subtasks: [],
      },
    ],
  },
  reducers: {
    addTask: (state, action) => {
      const { status } = action.payload
      state[status].push(action.payload)
    },
    moveTask: (state, action) => {
      const { taskId, sourceColumn, destinationColumn, destinationIndex } = action.payload
      const task = state[sourceColumn].find((t) => String(t.id) === String(taskId))
      if (!task) return
      state[sourceColumn] = state[sourceColumn].filter((t) => String(t.id) !== String(taskId))
      state[destinationColumn].splice(destinationIndex, 0, task)
    },
    addSubtask: (state, action) => {
      const { taskId, text } = action.payload
      for (const col of Object.values(state)) {
        const task = col.find((t) => String(t.id) === String(taskId))
        if (task) {
          if (!task.subtasks) task.subtasks = []
          task.subtasks.push({ id: crypto.randomUUID(), text, completed: false })
          return
        }
      }
    },
    toggleSubtask: (state, action) => {
      const { taskId, subtaskId } = action.payload
      for (const col of Object.values(state)) {
        const task = col.find((t) => String(t.id) === String(taskId))
        if (task) {
          const subtask = task.subtasks?.find((s) => s.id === subtaskId)
          if (subtask) subtask.completed = !subtask.completed
          return
        }
      }
    },
  },
})

export const { addTask, moveTask, addSubtask, toggleSubtask } = taskSlice.actions
export default taskSlice.reducer
