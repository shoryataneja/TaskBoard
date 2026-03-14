import { createSlice } from '@reduxjs/toolkit'

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    todo: [],
    inProgress: [],
    done: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.todo.push(action.payload)
    },
    moveTask: (state, action) => {
      const { task, from, to } = action.payload
      state[from] = state[from].filter((t) => t.id !== task.id)
      state[to].push(task)
    },
  },
})

export const { addTask, moveTask } = taskSlice.actions
export default taskSlice.reducer
