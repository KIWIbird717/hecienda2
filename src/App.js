import { Main } from './pages/Main'
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum"
import { Web3Modal } from "@web3modal/react"
import { configureChains, createClient, WagmiConfig } from "wagmi"
import { bsc } from "wagmi/chains"
import { Web3Button } from "@web3modal/react"
import { useWeb3ModalTheme } from "@web3modal/react";
import { getToken, getTotalAmount, getBeneficiary, getVestStartTimestamp } from './blockchain/vesting'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@mui/material'


function App() {
  const chains = [bsc];
  const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId: "a13ba38e6355e1943c13f06668fff534" }),
  ]);
  const { setTheme } = useWeb3ModalTheme();
  console.log(provider)

  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({
      projectId: "a13ba38e6355e1943c13f06668fff534",
      version: "1",
      appName: "hecienda",
      chains,
    }),
    provider,
  })

  setTheme({
    themeMode: "light",
    themeColor: "green",
    themeBackground: "themeColor",
  })

  const etherClient = new EthereumClient(wagmiClient, chains);

  // CONTRACT DATA
  // console.log(wagmiClient.storage.getItem('store').state.data.account)
  // console.log(wagmiClient)
  // console.log(getToken(wagmiClient.provider, "0x10a699481b08cd944995fdb1F92ae99097666890"))
  // console.log(getBeneficiary(wagmiClient.provider, "0x10a699481b08cd944995fdb1F92ae99097666890"))
  console.log(getVestStartTimestamp(wagmiClient.provider, "0x10a699481b08cd944995fdb1F92ae99097666890"))
  const totalAmountHandler = () => { 

  }


  return (
    <>
      <Web3Modal
        projectId="a13ba38e6355e1943c13f06668fff534"
        ethereumClient={etherClient}
      />
      <div className='fixed'>
        <Web3Button />
        <Button color='primary' variant="contained" onClick={() => totalAmountHandler}>get</Button>
      </div>
      <WagmiConfig onConnect={() => console.log()} client={wagmiClient}>

        <Main />

      </WagmiConfig>
    </>
  );
}

export default App;
