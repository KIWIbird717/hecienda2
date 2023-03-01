import React from 'react'
import { Grid } from '@mui/material'
import { Button } from '@mui/material'
import { useState, useEffect } from 'react'
import walletSvg from '../media/wallet.svg'
import stacking from '../media/stacking.svg'
import { vesitngVaultClaim } from '../blockchain/vesting'
import { useSelector } from 'react-redux'
// import { useWaitForTransaction } from 'wagmi'


export const PromCard = ({ onOpenModal }) => {

  const gridHandler = () => {
    if (windowWidth < 740) {
      return 12
    } else {
      return 6
    }
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [grid, setGrid] = useState(gridHandler())
  const provider = useSelector(state => state.client.provider)
  const [dummy, setDummy] = useState([
    {
      id: 1,
      title: 'Claim Hacienda tokens',
      paragraph: 'Claim tokens',
      image: walletSvg,
      button: false,
      buttonText: 'Withdraw',
      onClick: onOpenModal
    },
    // {
    //   id: 2,
    //   title: 'Vesting',
    //   paragraph: 'Claim HADA tokens from vesting. ',
    //   image: stacking,
    //   button: true,
    //   buttonText: 'Withdraw',
    //   onClick: () => console.log('clicked'),
    // },
    {
      id: 3,
      title: 'Invest tokents for stacking',
      paragraph: 'Earn passive income in the form of rewards while keeping crypto assets safe',
      image: stacking,
      button: false,
      buttonText: 'Withdraw',
      onClick: () => console.log("clicked")
    },
  ])

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth)
      setGrid(gridHandler())
    })
  }, [window.innerWidth]);

  // const { data, isError, isLoading } = useWaitForTransaction({
  //   confirmations: 1,
  //   hash: contractAddress,
  //   onSuccess(data) {
  //     console.log('Success', data)
  //   },
  // })
  

  return (
    <div className='w-full mt-[50px]'>
      <h3 className='font-semibold mb-[10px] ml-[7px]'>Quick actions</h3>
      <Grid container spacing={1}>
        {dummy.map(item => (
          <Grid key={item.id} id={item.id} item xs={grid}>
            <div style={{ background: `url(${item.image}) no-repeat right`, backgroundPosition: '100% 50px' }} className='h-[250px] shadow-md rounded-[10px] bg-white p-[20px] flex'>
              <div className='flex flex-col justify-between h-full'>
                <div>
                  <h3 className='text-[22px] mb-[10px]'>{item.title}</h3>
                  <h5 className='text-[#888]'>{item.paragraph}</h5>
                </div>
                {item.button ? (
                  <Button onClick={item.onClick} sx={{ width: 'fit-content', padding: '10px 50px', color: 'white' }} color='primary' variant="contained">{item.buttonText}</Button>
                ) : (
                  <Button disabled sx={{ width: 'fit-content', padding: '10px 50px', color: 'white' }} color='primary' variant="contained">{item.buttonText}</Button>
                )}
              </div>
            </div>
          </Grid>
        ))}
      </Grid>

    </div>
  )
}
