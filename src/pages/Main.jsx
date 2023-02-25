import { 
  Banner, 
  UserCard, 
  StatBar, 
  Statistics, 
  PromCard, 
  Alltransactions, 
  ModalDisconnect, 
  ModalClaimTokens 
} from '../components'
import { React, useEffect } from 'react'
import styles from '../styles'
import Grid from '@mui/material/Grid';
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Fab from '@mui/material/Fab'
import DataSaverOffRoundedIcon from '@mui/icons-material/DataSaverOffRounded'


export const Main = () => {
  const [veiewAllTransactions, setViewAllTransactions] = useState(false)
  const [modalDisconnect, setModalDisconnect] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [panel, setPanel] = useState(false)
  const [modalClaimTokens, setModalClaimTokens] = useState(false)

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth)
    })
  }, []);

  const EnableBodyScroll = () => {
    document.body.style.overflow = "visible"
  }


  return (
    <>
      <AnimatePresence>
        <SwipeableDrawer 
          anchor={'right'}
          open={panel}
          onClose={() => setPanel(false)}
          onOpen={() => setPanel(true)}
          sx={{ background: 'transparent' }}
        >
          <div className='w-[350px]'>
            <UserCard 
              openModal={() => {setPanel(false); setModalDisconnect(true)} }
              style={{ height: '80px' }} shadow='shadow-md rounded-[0]'
            />
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
        {modalClaimTokens && <ModalClaimTokens onCloseModal={() => setModalClaimTokens(false)}/>}
      </AnimatePresence>

      <AnimatePresence>
        {modalDisconnect ? <ModalDisconnect closeModalDisconnect={() => setModalDisconnect(false)}/> : null}
      </AnimatePresence>

      <AnimatePresence>
        {veiewAllTransactions ? (
          <Alltransactions closeAllTransactions={() => {setViewAllTransactions(false); EnableBodyScroll()}}/>
        ) : (
          EnableBodyScroll()
        )}
        {/* <BuyTokens /> */}
      </AnimatePresence>
      <div className={`${styles.globalPaddings} app lg:max-w-[1920px] lg:m-[auto]`}>
        <Grid container spacing={2}>
          <Grid item xs={windowWidth < 1100 ? 12 : 9}>
            <Banner />
            <Statistics title='Vesting statistics'/>
            {/* <Statistics title='Stacking statistics'/> */}
            <PromCard onOpenModal={() => {setPanel(false); setModalClaimTokens(true)}}/>
          </Grid>
          <Grid item xs={windowWidth < 1100 ? 0 : 3}>
            <div 
              style={{ 
                minWidth: '-webkit-fill-available', 
                marginRight: '20px', 
                maxHeight: 'calc(100% - 40px)',
                display: windowWidth < 1100 ? 'none' : ''
              }} 
              className='flex flex-col fixed'
            >
              <UserCard 
                openModal={() => {setPanel(false); setModalDisconnect(true)} }
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
    </>
  );
}

