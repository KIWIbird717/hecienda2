import { createSlice } from "@reduxjs/toolkit";

export const clientSlice = createSlice({
  name: 'client',
  initialState: {
    provider: null,
    clientDisconnect: null,
    clientContractAddress: "0x56a63569d959B99b8f8e1c8404c6054333cAd0cB",
    clientVesting: {
      inWeek: null,
      avaliable: null,
      leftToGet: null,
      origInvested: null,
    }
  },
  reducers: {
    setClientProvider: (state, action) => {
      state.provider = action.payload.provider
    },
    setClientDisconnect: (state, action) => {
      state.clientDisconnect = action.payload.clientDisconnect
    },
    setClientVesting: (state, action) => {
      state.clientVesting = action.payload.clientVesting
    }
  }
})

export const { setClientProvider, setClientDisconnect, setClientVesting } = clientSlice.actions
export default clientSlice.reducer