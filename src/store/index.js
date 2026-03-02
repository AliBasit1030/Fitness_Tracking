import { configureStore } from '@reduxjs/toolkit'

function dummyReducer(state = {}) {
  return state
}

export const store = configureStore({
  reducer: { dummy: dummyReducer }
})
