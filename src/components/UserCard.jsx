import React from 'react'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
// import copy from 'copy-to-clipboard'
import { useSelector } from 'react-redux';


export const UserCard = ({openModal, style, shadow}) => {
  const userBalance = 503
  const userWalletId = useSelector(state => state.client.wallet).slice(9)

  // const setToolTip = () => {
  //   setTooltipOpen(true)
  //   setTimeout(setTooltipOpen, 2000, false)

  //   copy(userWalletId)
  //   navigator.clipboard.writeText(userWalletId)
  //     .then(() => {
  //       // Получилось!
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  return (
    <div style={style} className={`max-[1350px]:h-[60px] max-w-[440px] w-full h-[80px] mb-[15px] bg-white p-[15px] flex items-center ${shadow}`}>
      <div style={{ background: 'conic-gradient(from 126.25deg at 50% 50%, #488DCD 0deg, #4FBB33 360deg)' }} className='max-[1350px]:h-[40px] rounded-[50%] aspect-square h-full mr-[15px]' />
      <div className='w-full'>
        <div className="flex items-center">
          <h4 style={{ textOverflow: 'ellipsis' }} className='w-full mr-[5px] text-[#262626] overflow-hidden'>{userWalletId.slice(0, 8) + '...' + userWalletId.slice(-5)}</h4>
          <Tooltip title="Disconnect" enterDelay={1600} disableInteractive>
            <IconButton sx={{ width: '28px', height: '28px',  }} onClick={openModal}>
              <LogoutRoundedIcon sx={{ width: '18px', height: '18px' }} fontSize='smal'/>
            </IconButton>
          </Tooltip>
        </div>
        
        <div className='flex items-end justify-between'>
          <div className='flex items-center'>
            <h5 className='text-[#666] mr-[5px]'>Balance:</h5>
            <h4 className='font-bold text-[#262626]'>{userBalance}</h4>
          </div>
          <Tooltip title="Buy tokens" enterDelay={1600} disableInteractive>
            <IconButton sx={{ width: '28px', height: '28px' }}>
              <AccountBalanceWalletOutlinedIcon sx={{ width: '18px', height: '18px' }} fontSize='smal'/>
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
