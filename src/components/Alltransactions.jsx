import React from 'react'
import { motion } from 'framer-motion';
import { TransactionCard } from '../components'
import { AnimatePresence } from 'framer-motion';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const Alltransactions = ({closeAllTransactions}) => {

  useEffect(() => {
    document.body.style.overflow = "hidden"
    document.body.style.maxHeight = '100%'
  }, [])

  const prevTransactionsData = useSelector(state => state.client.prevTransactions)
  const [prevTransactions, setPrevTransactinos] = useState(null)


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      style={{ top: `${window.pageYOffset}px` }}
      className='absolute w-full h-[100vh] left-0 bg-[rgba(0,0,0,.5)] overflow-hidden z-[10] flex items-center justify-center'
    >
      <ClickAwayListener onClickAway={closeAllTransactions}>
        <motion.div 
          className='p-[30px] w-[600px] h-[82vh] mx-[20px] overflow-hidden bg-white rounded-[10px] z-[11]'
          initial={{ scale: 0, x: 500, y: 300 }}
          animate={{ scale: 1, x: 0, y: 0 }}
          transition={{ duration: 0.2, type: 'easeIn' }}
        >
          <div className='flex justify-between items-center mb-[10px]'>
            <h3 className='font-semibold'>All transactions</h3>
            <IconButton onClick={closeAllTransactions}>
              <CancelIcon />
            </IconButton>
          </div>
          {/* <div className='no-scroll-bar h-[95%] overflow-y-scroll'> */}
          <div className='h-[95%] overflow-y-scroll'>
            <AnimatePresence>
              {prevTransactionsData ? (
                (prevTransactionsData.map((item, index) => (
                  <TransactionCard 
                    key={index}
                    id={index} 
                    date={item.block_signed_at} 
                    hash={item.bscTx}
                    animate={true}
                  />
                )))
              ) : (
                null
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </ClickAwayListener>
    </motion.div>
  )
}
