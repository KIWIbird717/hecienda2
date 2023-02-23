import { createSlice } from "@reduxjs/toolkit";

export const clientSlice = createSlice({
  name: 'client',
  initialState: {
    wallet: null,
    clientDisconnect: null
  },
  reducers: {
    setClientWallet: (state, action) => {
      state.wallet = action.payload.wallet
    },
    setClientDisconnect: (state, action) => {
      state.clientDisconnect = action.payload.clientDisconnect
    }
  }
})

export const { setClientWallet, setClientDisconnect } = clientSlice.actions
export default clientSlice.reducer