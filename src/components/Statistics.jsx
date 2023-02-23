import React from 'react'
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { getTotalAmount } from '../blockchain/vesting';
import { useSelector } from 'react-redux';


const dummy = [
  {
    id: 1,
    title: 'In day',
    info: '42.03',
    latestInfo: '15.47%'
  },
  {
    id: 2,
    title: 'Available',
    info: '507.3',
    latestInfo: '15.47%'
  },
  {
    id: 3,
    title: 'Earned funds',
    info: '1 203',
    latestInfo: '15.47%'
  },
  {
    id: 4,
    title: 'Originally invested',
    info: '1400',
    latestInfo: '100%'
  },
]

export const Statistics = ({ title }) => {
  const gridHandler = () => {
    if (windowWidth < 675) {
      return 6
    } else {
      return 3
    }
  }

  const provider = useSelector(state => state.client.provider)
  const contractAddress = "0x10a699481b08cd944995fdb1F92ae99097666890"
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [grid, setGrid] = useState(gridHandler())
  const [origInvested, setOrigInvested] = useState(null)
  
  // const handler = async () => {
  //   try{
  //     const val = await getTotalAmount(provider, contractAddress).then(res => Number(res._hex) / 10**18)
  //     setOrigInvested(val)
  //     dummy[3].info = `${origInvested}`
  //   } catch(err) {
  //     console.log(err)
  //   }
  // }

  // handler()


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
              <h4>{item.title}</h4>
              <div className='flex items-end'>
                <h2 className='font-semibold mr-[5px]'>{item.info}</h2>
                <h4>HADA</h4>
              </div>
              <div className='max-[1099px]:p-[5px] p-[10px] border border-[#bbb] rounded-[5px] flex items-center justify-center'>
                <h4 className='text-[green]'>{item.latestInfo}</h4>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
