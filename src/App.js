import { Banner, UserCard, StatBar, Statistics, PromCard, Alltransactions } from './components';
import { React, useEffect } from 'react'
import styles from './styles'
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Fab from '@mui/material/Fab';
import DataSaverOffRoundedIcon from '@mui/icons-material/DataSaverOffRounded';
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { arbitrum, bsc, mainnet, polygon } from "wagmi/chains";
import { Web3Button } from "@web3modal/react";
import {getToken} from "./blockchain/vesting"


const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#80AB54',
      darker: '#80AB54',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
    dop: {
      main: '#fff'
    }
  },
});

function App() {
  const [veiewAllTransactions, setViewAllTransactions] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [panel, setPanel] = useState(false)

  const chains = [bsc];
  const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId: "a13ba38e6355e1943c13f06668fff534" }),
  ]);

  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({
      projectId: "a13ba38e6355e1943c13f06668fff534",
      version: "1",
      appName: "web3Modal",
      chains,
    }),
    provider,
  });

  const ethereumClient = new EthereumClient(wagmiClient, chains);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth)
    })
  }, [window.innerWidth]);

  const EnableBodyScroll = () => {
    document.body.style.overflow = "visible"
  }
  console.log(provider.bind)

  console.log(getToken(provider, "0x10a699481b08cd944995fdb1F92ae99097666890"))


  return (
    <>
    <WagmiConfig client={wagmiClient}>
    <Web3Modal
      projectId="a13ba38e6355e1943c13f06668fff534"
      ethereumClient={ethereumClient}
    />
    <div className='fixed top-0 left-0'>
      <Web3Button />;
    </div>
    <ThemeProvider theme={theme}>
      <AnimatePresence>
        <SwipeableDrawer 
          anchor={'right'}
          open={panel}
          onClose={() => setPanel(false)}
          sx={{ background: 'transparent' }}
        >
          <div className='w-[350px]'>
            <UserCard style={{ height: '80px' }} shadow='shadow-md rounded-[0]'/>
            <StatBar 
              openAllTransactions={() => {setPanel(false); setViewAllTransactions(true)}}
              pieChart={{ transform: 'scale(1)' }}
            />
          </div>
        </SwipeableDrawer>
      </AnimatePresence>

      <div style={{ display: windowWidth < 1100 ? 'block' : 'none' }} className='fixed bottom-10 right-10 z-[20]'>
        <Fab 
          onClick={() => setPanel(true)}
          color="primary" 
          aria-label='add'
        >
          <DataSaverOffRoundedIcon color='dop'/>
        </Fab>
      </div>

      <AnimatePresence>
        {veiewAllTransactions ? (
          <Alltransactions closeAllTransactions={() => {setViewAllTransactions(false); EnableBodyScroll()}}/>
        ) : (
          EnableBodyScroll()
        )}
      </AnimatePresence>
      <div className={`${styles.globalPaddings} app lg:max-w-[1920px] lg:m-[auto]`}>
        <Grid container spacing={2}>
          <Grid item xs={windowWidth < 1100 ? 12 : 9}>
            <Banner />
            <Statistics title='Vesting statistics'/>
            {/* <Statistics title='Stacking statistics'/> */}
            <PromCard />
          </Grid>
          <Grid item xs={windowWidth < 1100 ? 0 : 3}>
            <div 
              style={{ 
                minWidth: '-webkit-fill-available', 
                marginRight: `${veiewAllTransactions ? 35 : 20}px`, 
                maxHeight: 'calc(100% - 40px)',
                display: windowWidth < 1100 ? 'none' : ''
              }} 
              className='flex flex-col fixed'
            >
              <UserCard 
                shadow='shadow-md rounded-[10px]'
              />
              <StatBar 
                openAllTransactions={() => setViewAllTransactions(true)}
                shadow='shadow-md'
              />
            </div>
          </Grid>
        </Grid>
      </div>
      <div className='max-[860px]:h-[240px] h-[320px] bg-[#D6EAB0] w-full absolute top-0 left-0 z-[-1]'/>
      </ThemeProvider>
      </WagmiConfig>
    </>
  );
}

export default App;
