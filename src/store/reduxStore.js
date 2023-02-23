import { configureStore } from '@reduxjs/toolkit'
import clientSlice from './clientSlice'

export default configureStore({
  reducer: {
    client: clientSlice
  }
})