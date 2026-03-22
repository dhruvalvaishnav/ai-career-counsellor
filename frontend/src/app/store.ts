import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '../features/ui/uiSlice'
import testReducer from '../features/test/testSlice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    test: testReducer,
  },
})

// These 2 lines give you TypeScript types for the whole store
// RootState = type of the entire store object
// AppDispatch = type of the dispatch function
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch