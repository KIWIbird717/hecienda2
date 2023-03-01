import { createSlice } from "@reduxjs/toolkit";

export const clientSlice = createSlice({
  name: 'client',
  initialState: {
    userAddress: null,
    provider: null,
    clientDisconnect: null,
    allVestingAddresses: null,
    clientContractVestingAddress: null,
    prevTransactions: null,
    clientVesting: {
      inWeek: null,
      avaliable: null,
      leftToGet: null,
      origInvested: null,
    }
  },
  reducers: {
    setUserAddress: (state, action) => {
      state.userAddress = action.payload.userAddress
    },
    setClientProvider: (state, action) => {
      state.provider = action.payload.provider
    },
    setClientDisconnect: (state, action) => {
      state.clientDisconnect = action.payload.clientDisconnect
    },
    setClientVesting: (state, action) => {
      state.clientVesting = action.payload.clientVesting
    },
    setAllVestingAddresses: (state, action) => {
      state.allVestingAddresses = action.payload.allVestingAddresses
    },
    setClientContractVestingAdress: (state, action) => {
      state.clientContractVestingAddress = action.payload.clientContractVestingAddress
    },
    setPrevTransactions: (state, action) => {
      state.prevTransactions = action.payload.prevTransactions
    }
  }
})

export const { setClientProvider, setClientDisconnect, setClientVesting, setAllVestingAddresses, setClientContractVestingAdress, setPrevTransactions, setUserAddress } = clientSlice.actions
export default clientSlice.reducer