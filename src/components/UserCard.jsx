import React from 'react'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useAccount } from 'wagmi';
import { useBalance } from 'wagmi'
import { useState, useEffect } from 'react'


export const UserCard = ({openModalWithdrawTokens, openModal, style, shadow}) => {
  const [balance, setBalance] = useState()
  const { address } = useAccount()
  const userWalletId = address

  const { data } = useBalance({
    address: address,
    watch: true,
  })

  useEffect(() => {
    if (data) {
      setBalance(data)
    }
  },[data])


  return (
    <div style={style} className={`max-[1350px]:h-[60px] max-w-[440px] w-full h-[80px] mb-[15px] bg-white p-[15px] flex items-center ${shadow}`}>
      <div style={{ background: 'conic-gradient(from 126.25deg at 50% 50%, #488DCD 0deg, #4FBB33 360deg)' }} className='max-[1350px]:h-[40px] rounded-[50%] aspect-square h-full mr-[15px]' />
      <div className='w-full'>
        <div className="flex items-center">
          {userWalletId && <h4 style={{ textOverflow: 'ellipsis' }} className='w-full mr-[5px] text-[#262626] overflow-hidden'>{userWalletId.slice(0, 8) + '...' + userWalletId.slice(-5)}</h4>}
          <Tooltip title="Disconnect" enterDelay={1600} disableInteractive>
            <IconButton sx={{ width: '28px', height: '28px',  }} onClick={openModal}>
              <LogoutRoundedIcon sx={{ width: '18px', height: '18px' }} fontSize='smal'/>
            </IconButton>
          </Tooltip>
        </div>
        
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <h5 className='text-[#666] mr-[5px]'>Balance:</h5>
            <h4 className='font-semibold'>{balance?.formatted.slice(0,7)} {balance?.symbol}</h4>
          </div>
          <Tooltip title="Change vault" enterDelay={1600} disableInteractive>
            <IconButton onClick={openModalWithdrawTokens} sx={{ width: '28px', height: '28px' }}>
              <AccountBalanceWalletOutlinedIcon sx={{ width: '18px', height: '18px' }} fontSize='smal'/>
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
