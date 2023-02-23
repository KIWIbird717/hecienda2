import { Main } from './pages/Main'
import { useState, useEffect } from 'react'
// import {
//   EthereumClient,
//   modalConnectors,
//   walletConnectProvider,
// } from "@web3modal/ethereum"
import { Web3Modal } from "@web3modal/standalone";
// import { configureChains, createClient, WagmiConfig } from "wagmi"
// import { bsc } from "wagmi/chains"
// import { Web3Button } from "@web3modal/react"
import SignClient from "@walletconnect/sign-client"
import { useWeb3ModalTheme } from "@web3modal/react";
// import { getVestStartTimestamp, getTotalAmount } from './blockchain/vesting'
// import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { setClientWallet, setClientDisconnect } from './store/clientSlice'


const web3Modal = new Web3Modal({
  projectId: process.env.REACT_APP_PROJECT_ID, 
  standaloneChains: ["eip:155:5"],
})

function App() {
  const clientStore = useSelector(state => state.client.wallet)
  const dispatch = useDispatch()

  const [signClient, setSignClient] = useState()
  const [clientSessions, setSessions] = useState([])
  const [accounts, setAccounts] = useState([])
  const [balance, setBalance] = useState(null)

  const { setTheme } = useWeb3ModalTheme();
  setTheme({
    themeMode: "light",
    themeColor: "green",
    themeBackground: "themeColor",
  });

  const createClient = async () => {
    try {
      const client = await SignClient.init({
        projectId: process.env.REACT_APP_PROJECT_ID
      })
      setSignClient(client)
      await subscribeToEvents(client)
    } catch (err) {
      console.log(err)
    }
  }

  const handleConnect = async () => {
    if (!signClient) throw Error("Cannot connect. Sign Client is not created")
    try {
      const proposalNamespaces = {
        eip155: {
          chains: ["eip155:5"],
          methods: ["eth_sendTransaction", "get_balance"],
          events: ["connect", "disconnect"],
        }
      }

      const { uri, approval } = await signClient.connect({
        requiredNamespaces: proposalNamespaces
      })

      if (uri) {
        web3Modal.openModal({uri})
        const sessionNamespace = await approval()
        onSessinConnect(sessionNamespace)
        web3Modal.closeModal()
      }

    } catch(err) {
      console.log(err)
    }
  }

  const handleDisconnect = async () => {
    try {
      await signClient.disconnect({
        topic: clientSessions.topic,
        code: 6000,
        message: "User disconnected"
      })
      reset()
    } catch (err) {
      console.log(err)
    }
  }
  dispatch(setClientDisconnect({clientDisconnect: handleDisconnect}))

  const reset = () => {
    setAccounts([])
    setSessions([])
  }

  const onSessinConnect = async (session) => {
    if (!session) throw Error("Cannot connect. Session doesn`t exist")
    try {
      setSessions(session)

      console.log('sign client', session.namespaces.eip155)

      setAccounts(session.namespaces.eip155.accounts[0])
      dispatch(setClientWallet({wallet: session.namespaces.eip155.accounts[0]}))
    } catch(err) {
      console.log(err)
    }
  }

  const subscribeToEvents = async (client) => {
    if (!client) throw Error("No events to subscribe to b/c. The client doesn`t exist")
    try {
      client.on("session_delete", () => {
        console.log("User disconnected from the session from their wallet")
        reset()
      })
    } catch (err) {
        console.log(err)
      }
    }

  useEffect(() => {
    if (!signClient) {
      createClient()
    }
  }, [signClient])

  console.log('clientSlice', clientStore)


  return (
    <>
      {accounts.length ? (
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
          <div className='w-full h-[100vh] flex flex-col items-center justify-center leading-[45px]'>
            <AnimatePresence key={2}>
              <motion.h2 
                key={1}
                className='font-semibold mb-[16px]'
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
                className='w-[280px]'
              >
                <Button onClick={() => handleConnect()} sx={{ color: 'white', width: '100%', padding: '10px 10px' }} color='primary' variant="contained">Connect wallet</Button>
              </motion.div>
            </AnimatePresence>
          </div>
      )}
    </>
  );
}

export default App;
