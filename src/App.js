import { Main } from './pages/Main'
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setClientProvider } from './store/clientSlice'
import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum'
import { Web3Button, Web3Modal, useWeb3ModalTheme } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { useAccount } from 'wagmi'
import { bsc, polygonMumbai } from 'wagmi/chains'
import CircularProgress from '@mui/material/CircularProgress';


function App() {
  const dispatch = useDispatch()
  const chains = [polygonMumbai]

  // Configure theme
  const { setTheme } = useWeb3ModalTheme();
  setTheme({
    themeMode: "light",
    themeColor: "green",
    themeBackground: "themeColor",
  });

  const projectId = process.env.REACT_APP_PROJECT_ID

  const { provider } = configureChains(chains, [walletConnectProvider({ projectId })])
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({ version: '1', appName: 'web3Modal', chains, projectId }),
    provider
  })
  dispatch(setClientProvider({provider: wagmiClient.provider}))

  const CheckState = () => {
    const { isConnecting, isConnected } = useAccount()

    return (
      <>
        {isConnected ? (
          <AnimatePresence key={1}>
            <motion.div
              initial={{ opacity: 0 }}
              transition={{ type: 'ease', duration: 0.8 }}
              animate={{ opacity: 1 }}
            >
              <Main />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className='w-full h-[100vh] flex flex-col items-center justify-center'>
            <AnimatePresence key={2}>
              <motion.h2 
                key={1}
                className='font-semibold mb-[16px] leading-[45px]'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'ease', duration: 0.6 }}
              >
                Hecienda
              </motion.h2>
              <motion.h4 
                key={2}
                className='max-w-[300px] text-center leading-[25px] mb-[20px] font-light text-[#666]'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'ease', duration: 0.6, delay: 0.2 }}
              >
                Connect your wallet to become a member of our project
              </motion.h4>
              <motion.div
                key={3}
                initial={{ opacity: 0 }}
                transition={{ type: 'ease', duration: 0.6, delay: 0.4 }}
                animate={{ opacity: 1 }}
              >
                <div className='w-[200px] h-[60px] flex items-center justify-center'>
                  {isConnecting ? (
                    <CircularProgress color="primary"/>
                  ) : (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        animate={{ opacity: 1 }}
                      >
                        <Web3Button />
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
                {/* <Disconnect /> */}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </>
    )
  }

  const ethereumClient = new EthereumClient(wagmiClient, chains)
  console.log(wagmiClient.provider)

  return (
    <WagmiConfig client={wagmiClient}>
          <CheckState />
          <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </WagmiConfig>
  );
}

export default App;
