import { createSlice } from "@reduxjs/toolkit";

export const clientSlice = createSlice({
  name: 'client',
  initialState: {
    provider: null,
    clientDisconnect: null
  },
  reducers: {
    setClientProvider: (state, action) => {
      state.provider = action.payload.provider
    },
    setClientDisconnect: (state, action) => {
      state.clientDisconnect = action.payload.clientDisconnect
    }
  }
})

export const { setClientProvider, setClientDisconnect } = clientSlice.actions
export default clientSlice.reducer