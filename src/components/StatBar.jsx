import React from 'react'
import { UserPieChart, TransactionCard } from '../components'
import { Button } from '@mui/material'
import { List } from '@mui/material';
import Link from '@mui/material/Link';
import { vesitngVaultClaim } from '../blockchain/vesting'
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { getBalanceOf } from '../blockchain/token'
import { useAccount } from 'wagmi';
import CircularProgress from '@mui/material/CircularProgress';
import { motion } from 'framer-motion';
import { HADATokenAddress } from '../data/addresses';


export const StatBar = ({openAllTransactions, pieChart, shadow}) => {
  const { address } = useAccount()
  const [balance, setBalance] = useState(null)
  const [isAlert, setAlert] = useState(false)
  const provider = useSelector(state => state.client.provider)
  const contractAddress = useSelector(state => state.client.clientContractVestingAddress)
  const prevTransactionsData = useSelector(state => state.client.prevTransactions)
  const clientVesting = useSelector(state => state.client.clientVesting)
  const [data, setData] = useState([
    {
      "id": "stacking",
      "label": "stacking",
      "value": null,
      "color": "#80AB54"
    },
    {
      "id": "vesting",
      "label": "vesting",
      "value": null,
      "color": "#C0DF85"
    },
    {
      "id": "avaliable",
      "label": "avaliable",
      "value": null,
      "color": "#DB6C79"
    },
  ])
  const [prevTransactions, setPrevTransactinos] = useState(null)

  useEffect(() => {
    setData([
      {
        "id": "stacking",
        "label": "stacking",
        "value": null,
        "color": "#80AB54"
      },
      {
        "id": "vesting",
        "label": "vesting",
        "value": clientVesting.origInvested,
        "color": "#C0DF85"
      },
      {
        "id": "avaliable",
        "label": "avaliable",
        "value": clientVesting.avaliable,
        "color": "#DB6C79"
      },
    ])
  }, [clientVesting])

  useEffect(() => {
    setPrevTransactinos(prevTransactionsData)
  }, [prevTransactionsData])

  const handleTransaction = async () => {
    try {
      await vesitngVaultClaim(contractAddress).then(res => res)
    } catch(err) {
      setAlert(true)
      console.log(err)
    }
  }

  function TransitionRight(props) {
    return <Slide {...props} direction="left" />;
  }

  const balanceHandle = async () => {
    const getBalance = await getBalanceOf(provider, HADATokenAddress, address).then(res => Number(res._hex) / 10**18)
    console.log('BALANCE', getBalance)
    setBalance(new Intl.NumberFormat('ja-JP').format(getBalance.toFixed(3)))
  }


  useEffect(() => {
    balanceHandle()
  }, [provider])


  return (
    <div
      className={`max-w-[440px] w-full rounded-[10px] bg-white ${shadow} p-[15px] overflow-hidden overflow-y-scroll no-scroll-bar flex flex-col justify-between`}
    >
      <Snackbar 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} 
        open={isAlert} autoHideDuration={5000} 
        onClose={() => setAlert(false)} 
        TransitionComponent={TransitionRight} 
      >
        <Alert onClose={() => setAlert(false)} severity="error" sx={{ width: '100%' }}>
          An error occurred while trying to transfer tokens
        </Alert>
      </Snackbar>
      <div>
        <h3 className='leading-[26px] font-semibold'>Balance usage</h3>
        <h4 className='text-[#666]'>Calculated by last activity</h4>
        <div className='max-[1350px]:h-[200px] h-[255px] relative z-1'>
          <div style={pieChart} className='max-[1335px]:scale-[1.1] max-[1165px]:scale-[1.2] max-[1125px]:scale-[1.4] max-[1099px]:z-[1] max-[1020px]:scale-[1.75] w-full h-full absolute z-[3]'>
            <UserPieChart />
          </div>
          <div className='max-[1350px]:h-[200px] absolute top-[0px] w-full h-[255px] flex flex-col items-center justify-center z-[2]'>
            <div className='max-[1615px]:h-[100px] h-[130px] flex flex-col items-center justify-between'>
              <div className='max-[1200px]:w-[20px] max-[1200px]:h-[20px] w-[30px] h-[30px] rounded-[50%] bg-[#999] flex justify-center items-center font-bold mb-[5px]'><h4 className='text-white'>H</h4></div>
              <h3 className=' font-bold text-[30px]'>{balance}</h3>
              <h4 className='text-[#4FBB33] font-semibold'>-</h4>
            </div>
          </div>
        </div>
        <div className='min-[1100px]:hidden flex flex-col items-center justify-between my-[10px]'>
            {/* Remove slice here to see stacking info */}
            {data.slice(1).map(el => (
              <div key={el.id} id={el.id} className='flex items-center'>
                <div style={{ backgroundColor: el.color }} className={`h-[10px] aspect-square rounded-[50%] mr-[3px]`}/>
                <h5>{el.label}:</h5>
                <h5 className='font-semibold ml-[2px]'>{el.value}</h5>
              </div>
            ))}
          </div>
        <div className='flex flex-col items-center mb-[15px]'>
          <div className='flex items-end'>
            <h3 className='font-bold mr-[5px]'>{data[2]["value"]}</h3>
            <h5 className='flex flex-col items-end'>HADA</h5>
          </div>
          <h4 className='font-regular'>Available to withdraw from vesting</h4>
        </div>
        <div>
          <Button onClick={() => handleTransaction()} sx={{ width: '100%', padding: '10px 10px', color: 'white' }} color='primary' variant="contained"><h4 className='text-white'>Withdraw funds</h4></Button>
        </div>
      </div>

      <div>
        <div className='mt-[30px] flex justify-between items-end'>
          <h3 className='font-semibold'>Latest transactions</h3>
          <div className='max-[1099px]:opacity-[0]'>
            <Link onClick={openAllTransactions} className='flex items-center cursor-pointer'>
              <h6 className='text-[green]'>View all transactions</h6>
            </Link>
          </div>
        </div>
        <div className='w-full h-auto overflow-y-hidden'>
          <List>
            {prevTransactions ? (
              (prevTransactions[0].bscTx === '0xDD' ? (
                <div className='w-full flex items-center justify-center my-[10px]'>
                  <h5 className="text-[#666]">No transactions were made</h5>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {prevTransactions.slice(0, 3).map((item, index) => (
                    <TransactionCard 
                      key={index}
                      id={index} 
                      date={item.block_signed_at} 
                      hash={item.bscTx}
                    />
                  ))}
                </motion.div>
              ))
            ) : (
              <div className='h-[195px] w-full flex items-center justify-center'>
                <CircularProgress color="success"/>
              </div>
            )}
          </List>
        </div>
      </div>
    </div>
  )
}
