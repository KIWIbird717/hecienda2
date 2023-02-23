import React from 'react'
import eth from '../media/eth.svg'
import { Divider } from '@mui/material'


export const TransactionCard = ({ id, date, amount, animate }) => {
  return (
    (animate ? (
      <div 
        className='mt-[15px]  bg-white'
      >
        <div className='flex items-start mb-[5px]'>
          <div className='max-[1350px]:h-[35px] h-[45px] aspect-square bg-[#BEB2D2] rounded-[50%] flex justify-center items-center mr-[20px]'>
            <img className='max-[1350px]:w-[10px]  w-[15px]' src={eth} alt='eth'/>
          </div>
          <div className='w-[80%]'>
            <div className='flex justify-between items-center'>
              <h4>Withdraw ETH</h4>
              <h6>{date}</h6>
            </div>
            <h4 className='font-semibold'>{amount}</h4>
          </div>
        </div>
        <Divider />
      </div>
    ) : (
      <div className='mt-[15px]  bg-white'>
        <div className='flex items-start mb-[5px]'>
          <div className='max-[1350px]:h-[35px] h-[45px] aspect-square bg-[#BEB2D2] rounded-[50%] flex justify-center items-center mr-[20px]'>
            <img className='max-[1350px]:w-[10px]  w-[15px]' src={eth} alt='eth'/>
          </div>
            <div className='w-[80%]'>
              <div className='flex justify-between items-center'>
                <h4>Withdraw ETH</h4>
                <h6>{date}</h6>
              </div>
              <h4 className='font-semibold'>{amount}</h4>
            </div>
          </div>
          {id === 3 ? null : <Divider />}
      </div>
    ))
  )
}
