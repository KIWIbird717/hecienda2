import { Main } from './pages/Main'
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setClientProvider, setAllVestingAddresses } from './store/clientSlice'
import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum'
import { Web3Button, Web3Modal, useWeb3ModalTheme } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { useAccount } from 'wagmi'
import { bsc, polygonMumbai } from 'wagmi/chains'
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import { getFetchData } from './blockchain/transactions';
import { useSelector } from 'react-redux';
import { useEffect } from 'react'
import { getTotalAmount } from './blockchain/vesting';
import { setClientContractVestingAdress, setPrevTransactions, setUserAddress } from './store/clientSlice';
import { getLatestTransactions } from './blockchain/prevTransactions';
import { tokenSaleAddress, USDTAddress, HADATokenAddress, linearVestingVaultFactory } from './data/addresses';
import { useState } from 'react'



function App() {
  const dispatch = useDispatch()
  const chains = [bsc]
  const [isRealyConnected, setIsRealyConnected] = useState(false)
  const vaultAddress = useSelector(state => state.client.clientContractVestingAddress)

  // Configure theme
  const { setTheme } = useWeb3ModalTheme();
  setTheme({
    themeMode: "light",
    themeColor: "green",
    themeBackground: "themeColor",
  });

  const projectId = process.env.REACT_APP_PROJECT_ID
  const userAddress = useSelector(state => state.client.userAddress)
  // const [userAddress, setUserAddRef] = useState(null)
  const { provider } = configureChains(chains, [walletConnectProvider({ projectId })])
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({ version: '1', appName: 'web3Modal', chains, projectId }),
    provider
  })
  dispatch(setClientProvider({provider: wagmiClient.provider}))


  const handleTransactionsAddresses = async () => {
    if (!wagmiClient.provider) throw new Error('Provider doesn`t exists')
    if (userAddress == undefined) throw new Error('User address doesnt exists')
    try {
      console.log('add handle transactions', userAddress)
      const addresses = await getFetchData(userAddress.toLowerCase()).then(res => res)

      console.log('addresses', addresses)
      const arrayOfTransactions = []
      addresses.forEach((address, index) => {
        arrayOfTransactions.push({
          id: index,
          address: address,
          isActive: false,
          amount: 0,
        })
      })

      let theBiggestTokenAmount = [0, ''];
      let vaultAddresses = []
      for (const address of arrayOfTransactions) {
        const origInvested = await getTotalAmount(wagmiClient.provider, address.address).then(res => Number(res._hex) / 10**18)
        vaultAddresses.push({
          id: address.id,
          address: address.address,
          isActive: false,
          amount: new Intl.NumberFormat('ja-JP').format(origInvested.toFixed(3)),
        })
        if (origInvested > theBiggestTokenAmount[0]) {
          theBiggestTokenAmount = [origInvested, address]
        }
      }
      console.log('add vault address', vaultAddresses)
      dispatch(setAllVestingAddresses({allVestingAddresses: vaultAddresses}))
      dispatch(setClientContractVestingAdress({clientContractVestingAddress: theBiggestTokenAmount[1].address}))
      if (addresses.length == 0) {
        setIsRealyConnected(true)
        dispatch(setAllVestingAddresses({allVestingAddresses: [{id: 0, address: '0xDD', isActive: false, amount: 0}]}))
        dispatch(setClientContractVestingAdress({clientContractVestingAddress: '0xDD'}))
      }
      // setVaultAddress(theBiggestTokenAmount[1].address)
    } catch (err) {
      console.error(err)
    }
  }

  const handleLatestTransactions = async () => {
    if (userAddress == null && vaultAddress == null) throw new Error('Can`t handle the lates transactions. Contract address is not defind')
    try {
      console.log('us add in tr', userAddress)
      const prevTransactions = await getLatestTransactions(
        userAddress.toLowerCase(), 
        USDTAddress.toLowerCase(),
        HADATokenAddress.toLowerCase(),
        linearVestingVaultFactory.toLowerCase(),
        tokenSaleAddress.toLowerCase(),
        vaultAddress.toLowerCase()
      ).then(res => res)
      dispatch(setPrevTransactions({prevTransactions: prevTransactions}))
      setIsRealyConnected(true)
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (userAddress !== null) {
      // setUserAddRef(userAddress)
      console.log('address up to date', userAddress)
    }
  }, [userAddress])

  useEffect(() => {
    if (userAddress !== null) {
      handleTransactionsAddresses()
    }
  }, [userAddress])

  useEffect(() => {
    if (userAddress !== null && vaultAddress !== null) {
      handleLatestTransactions()
    }
  }, [vaultAddress])



  const CheckState = () => {
    const { isConnecting, isConnected } = useAccount()
    const { address } = useAccount()

    const handleUserAddress = () => {
      console.log('chek state address', address)
      dispatch(setUserAddress({userAddress: address}))
    }

    useEffect(() => {
      if (isConnected) {
        handleUserAddress()
      }
    }, [address])

    return (
      <>
        {isConnected ? (
          (isRealyConnected ? (
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
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="w-full h-[100vh] flex flex-col items-center justify-center"
              >
                <CircularProgress color="success" />
                <motion.h4
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 1 }}
                  className='text-[#666] mt-[20px]'
                >
                  Let us prepare all for you
                </motion.h4>
              </motion.div>
            </AnimatePresence>
          ))
        ) : (
          <>
          <div className='w-full h-[100vh] flex flex-col items-center justify-between'>
            <div></div>
            <div className='flex flex-col items-center'>
            <AnimatePresence key={2}>
              <motion.h2 
                key={1}
                className='font-semibold mb-[16px] leading-[45px]'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'ease', duration: 0.6 }}
              >
                Hacienda
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
              </motion.div>
            </AnimatePresence>
            </div>
            <motion.h4 className='mb-[10px] text-[#888]' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.6 }}>
              Created by <Link href='https://t.me/vladislav_mindel' sx={{ cursor: 'pointer', margin: '0 5px' }}>XONO</Link>
            </motion.h4>
          </div>
          </>
        )}
      </>
    )
  }

  const ethereumClient = new EthereumClient(wagmiClient, chains)

  return (
    <WagmiConfig client={wagmiClient}>
          <CheckState />
          <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </WagmiConfig>
  );
}

export default App;
