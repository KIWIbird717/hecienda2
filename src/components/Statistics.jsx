import React from 'react'
import Grid from '@mui/material/Grid';
import { ListItemSecondaryAction } from '@mui/material';
import { useEffect, useState } from 'react';


const dummy = [
  {
    id: 1,
    title: 'In day',
    info: '$42.03',
    latestInfo: '15.47%'
  },
  {
    id: 2,
    title: 'Available',
    info: '$507.3',
    latestInfo: '15.47%'
  },
  {
    id: 3,
    title: 'Earned funds',
    info: '$1 203',
    latestInfo: '15.47%'
  },
  {
    id: 4,
    title: 'Originally invested',
    info: '$140 027',
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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [grid, setGrid] = useState(gridHandler())

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth)
      setGrid(gridHandler())
    })
  }, [window.innerWidth]);

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
                <h2 className='font-semibold'>{item.info}</h2>
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
