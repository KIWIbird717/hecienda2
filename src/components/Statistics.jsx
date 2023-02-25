import React from 'react'
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { getTotalAmount, getVestEndTimestamp, getVestStartTimestamp, getVested, getUnvested } from '../blockchain/vesting';
import { useSelector, useDispatch } from 'react-redux';
import { setClientVesting } from '../store/clientSlice';
import Skeleton from '@mui/material/Skeleton';
import { motion } from 'framer-motion';
import { NumericFormat } from 'react-number-format';


export const Statistics = ({ title }) => {
  const dispatch = useDispatch()

  const gridHandler = () => {
    if (windowWidth < 675) {
      return 6
    } else {
      return 3
    }
  }

  const provider = useSelector(state => state.client.provider)
  const contractAddress = useSelector(state => state.client.clientContractAddress)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [grid, setGrid] = useState(gridHandler())
  const [dummy, setDummy] = useState([
    {
      id: 1,
      title: 'In week',
      info: null,
      latestInfo: '15.47%'
    },
    {
      id: 2,
      title: 'Available',
      info: null,
      latestInfo: '15.47%'
    },
    {
      id: 3,
      title: 'Earned funds',
      info: null,
      latestInfo: '15.47%'
    },
    {
      id: 4,
      title: 'Originally invested',
      info: null,
      latestInfo: '100%'
    },
  ])
  
  const handlerStatistics = async () => {
    try{
      const endTimeStamp = await getVestEndTimestamp(provider, contractAddress).then(res => Number(res._hex))
      const startTimeStamp = await getVestStartTimestamp(provider, contractAddress).then(res => Number(res._hex))

      const inDayRes = await getTotalAmount(provider, contractAddress).then(res => Number(res._hex) / 10**18) 
      const inWeek = inDayRes / (endTimeStamp - startTimeStamp) * 3600 * 24 * 7

      const avaliable = await getVested(provider, contractAddress).then(res => Number(res._hex) / 10**18)

      const leftToGet = await getUnvested(provider, contractAddress).then(res => Number(res._hex) / 10**18)

      const origInvested = await getTotalAmount(provider, contractAddress).then(res => Number(res._hex) / 10**18)

      setDummy([
        {
          id: 1,
          title: 'In week',
          info: new Intl.NumberFormat('ja-JP').format(inWeek.toFixed(3)),
          latestInfo: '15.47%'
        },
        {
          id: 2,
          title: 'Available',
          info: new Intl.NumberFormat('ja-JP').format(avaliable.toFixed(3)),
          latestInfo: '15.47%'
        },
        {
          id: 3,
          title: 'Left to get',
          info: new Intl.NumberFormat('ja-JP').format(leftToGet.toFixed(3)),
          latestInfo: '15.47%'
        },
        {
          id: 4,
          title: 'Originally invested',
          info: new Intl.NumberFormat('ja-JP').format(origInvested.toFixed(3)),
          latestInfo: '100%'
        },
      ])
      dispatch(setClientVesting({clientVesting: {
        inWeek: new Intl.NumberFormat('ja-JP').format(inWeek.toFixed(3)),
        avaliable: new Intl.NumberFormat('ja-JP').format(avaliable.toFixed(3)),
        leftToGet: new Intl.NumberFormat('ja-JP').format(leftToGet.toFixed(3)),
        origInvested: new Intl.NumberFormat('ja-JP').format(origInvested.toFixed(3)),
      }}))
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handlerStatistics()
  }, [provider])



  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth)
      setGrid(gridHandler())
    })
  }, [window.innerWidth])

  return (
    <div className='mt-[50px]'>
      <h3 className='font-semibold mb-[10px] ml-[7px]'>{title}</h3>
      <Grid container spacing={1}>
        {dummy.map(item => (
          <Grid key={item.id} item xs={grid}>
            <div 
              id={item.id}
              className='max-[1615px]:h-[180px] max-[1375px]:p-[15px] max-[1375px]:h-[160px] max-[1265px]:h-[140px] w-full h-[200px] bg-white shadow-md rounded-[10px] p-[20px] flex flex-col justify-between'
            >
              {item.info ? (<motion.h4 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>{item.title}</motion.h4>) : (<Skeleton animation="wave" variant="text" sx={{ fontSize: '20px', width: '60%' }} />)}
              <div className='flex items-end'>
                {item.info ? (
                  <>
                    <motion.h2 
                      className='font-semibold mr-[5px]'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      {item.info}
                    </motion.h2>
                    <motion.h4
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >HADA</motion.h4>
                  </>
                ) : (
                  <Skeleton animation="wave" variant="text" sx={{ fontSize: '40px', width: '80%' }} />
                )}
              </div>
              {item.info ? (
                <motion.div 
                  className='max-[1099px]:p-[5px] p-[10px] border border-[#bbb] rounded-[5px] flex items-center justify-center'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <h4 className='text-[green]'>{item.latestInfo}</h4>
                </motion.div>
              ) : (
                <Skeleton animation="wave" variant="text" sx={{ fontSize: '60px', width: '100%' }} />
              )}
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
