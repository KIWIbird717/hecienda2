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
    if (windowWidth < 786) {
      return 6
    } else {
      return 3
    }
  }

  const provider = useSelector(state => state.client.provider)
  const contractAddress = useSelector(state => state.client.clientContractVestingAddress)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [grid, setGrid] = useState(gridHandler())
  const [dummy, setDummy] = useState([
    {
      id: 1,
      title: 'In week',
      info: null,
      latestInfo: '-'
    },
    {
      id: 2,
      title: 'Available',
      info: null,
      latestInfo: '-'
    },
    {
      id: 3,
      title: 'Earned funds',
      info: null,
      latestInfo: '-'
    },
    {
      id: 4,
      title: 'Originally invested',
      info: null,
      latestInfo: '-'
    },
  ])
  
  const handlerStatistics = async () => {
    try{
      if (contractAddress !== '0xDD') {
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
            latestInfo: '-'
          },
          {
            id: 2,
            title: 'Available',
            info: new Intl.NumberFormat('ja-JP').format(avaliable.toFixed(3)),
            latestInfo: '-'
          },
          {
            id: 3,
            title: 'Left to get',
            info: new Intl.NumberFormat('ja-JP').format(leftToGet.toFixed(3)),
            latestInfo: '-'
          },
          {
            id: 4,
            title: 'Originally invested',
            info: new Intl.NumberFormat('ja-JP').format(origInvested.toFixed(3)),
            latestInfo: '-'
          },
        ])

        dispatch(setClientVesting({clientVesting: {
          inWeek: new Intl.NumberFormat('ja-JP').format(inWeek.toFixed(3)),
          avaliable: new Intl.NumberFormat('ja-JP').format(avaliable.toFixed(3)),
          leftToGet: new Intl.NumberFormat('ja-JP').format(leftToGet.toFixed(3)),
          origInvested: new Intl.NumberFormat('ja-JP').format(origInvested.toFixed(3)),
        }}))
      } else {
        setDummy([
          {
            id: 1,
            title: 'In week',
            info: (0.00000000000000001).toFixed(0),
            latestInfo: '-'
          },
          {
            id: 2,
            title: 'Available',
            info: (0.00000000000000001).toFixed(0),
            latestInfo: '-'
          },
          {
            id: 3,
            title: 'Left to get',
            info: (0.00000000000000001).toFixed(0),
            latestInfo: '-'
          },
          {
            id: 4,
            title: 'Originally invested',
            info: (0.00000000000000001).toFixed(0),
            latestInfo: '-'
          },
        ])

        dispatch(setClientVesting({clientVesting: {
          inWeek: (0.00000000000000001).toFixed(0),
          avaliable: (0.00000000000000001).toFixed(0),
          leftToGet: (0.00000000000000001).toFixed(0),
          origInvested: (0.00000000000000001).toFixed(0),
        }}))
      }

    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    handlerStatistics()
  }, [provider, contractAddress])



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
              {item.info ? ( 
                  <motion.h4 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 0.4 }}
                    className='flex items-center'
                  >
                    {item.title}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="w-[20px] h-[20px] bg-zinc-500 flex items-center justify-center rounded-full ml-[5px]"
                    >
                      <motion.h5 className='text-white'>H</motion.h5>
                    </motion.div>
                  </motion.h4>
                ) : (
                  <Skeleton animation="wave" variant="text" sx={{ fontSize: '20px', width: '60%' }} />
              )}
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
