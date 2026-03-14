import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './taskSlice'
import { loadState, saveState } from '../utils/localStorage'

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  preloadedState: loadState('tasks')
    ? { tasks: loadState('tasks') }
    : undefined,
})

store.subscribe(() => {
  saveState('tasks', store.getState().tasks)
})

export default store
