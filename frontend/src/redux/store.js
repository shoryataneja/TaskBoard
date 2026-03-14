import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './taskSlice'
import filterReducer from './filterSlice'
import { loadState, saveState } from '../utils/localStorage'

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    filter: filterReducer,
  },
  preloadedState: loadState('tasks')
    ? { tasks: loadState('tasks') }
    : undefined,
})

store.subscribe(() => {
  saveState('tasks', store.getState().tasks)
})

export default store
