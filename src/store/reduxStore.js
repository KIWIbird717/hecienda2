import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import clientSlice from './clientSlice'

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

export default configureStore({
  reducer: {
    client: clientSlice,
  },
  middleware: customizedMiddleware,
})