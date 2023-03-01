import React from 'react'
import { Divider } from '@mui/material'
import CurrencyExchangeRoundedIcon from '@mui/icons-material/CurrencyExchangeRounded';
import Link from '@mui/material/Link';


export const TransactionCard = ({ id, date, hash, animate }) => {
  return (
    (animate ? (
      <div 
        className='mt-[15px]  bg-white'
      >
        <div className='flex items-start mb-[5px]'>
          <div className='max-[1350px]:h-[35px] h-[45px] aspect-square bg-[#BEB2D2] rounded-[50%] flex justify-center items-center mr-[20px]'>
            <CurrencyExchangeRoundedIcon />
          </div>
          <div className='w-[80%]'>
            <div className='flex justify-between items-center'>
              <h4>HADA interaction</h4>
              <h6>{date}</h6>
            </div>
            <Link href={hash} target="_blank">
              <h4 className='text-[green]'>See more transaction info</h4>
            </Link>
          </div>
        </div>
        <Divider />
      </div>
    ) : (
      <div className='mt-[15px]  bg-white'>
        <div className='flex items-start mb-[5px]'>
          <div className='max-[1350px]:h-[35px] h-[45px] aspect-square bg-[#BEB2D2] rounded-[50%] flex justify-center items-center mr-[20px]'>
            <CurrencyExchangeRoundedIcon />
          </div>
            <div className='w-[80%]'>
              <div className='flex justify-between items-center'>
                <h4>HADA interaction</h4>
                <h6>{date}</h6>
              </div>
              <Link href={hash} target="_blank">
                <h4 className='text-[green]'>See more transaction info</h4>
              </Link>
            </div>
          </div>
          {id === 2 ? null : <Divider />}
      </div>
    ))
  )
}
