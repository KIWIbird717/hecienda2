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


function App() {
  const chains = [bsc];
  const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId: "a13ba38e6355e1943c13f06668fff534" }),
  ]);
  const { theme, setTheme } = useWeb3ModalTheme();

  // Web3 modals theme


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
  console.log(wagmiClient)

  setTheme({
    themeMode: "light",
    themeColor: "green",
    themeBackground: "themeColor",
  })

  const etherClient = new EthereumClient(wagmiClient, chains);

  return (
    <>
      <Web3Modal
        projectId="a13ba38e6355e1943c13f06668fff534"
        ethereumClient={etherClient}
      />
      <div className='fixed'>
        <Web3Button />
      </div>
      <WagmiConfig client={wagmiClient}>

        <Main/>

      </WagmiConfig>
    </>
  );
}

export default App;
