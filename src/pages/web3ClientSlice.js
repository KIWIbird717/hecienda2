import { createSlice } from '@reduxjs/toolkit'

export const clientSlice = createSlice({
  name: 'client',
  initialState: {
    walletId: null,
  },
  reducers: {
    setWalletId: (state, value) => {
      state.value = value.payload
    }
  }
})

export const { setWalletId } = clientSlice.actions
export default clientSlice.reducer