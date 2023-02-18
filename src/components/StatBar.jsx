import React from 'react'
import { UserPieChart, TransactionCard } from '../components'
import { Button } from '@mui/material'
import { latestTransactionsData } from '../data/LatestTransactionDummy'
import { List } from '@mui/material';
import Link from '@mui/material/Link';
import { data } from '../data/pieChartData'
import EastRoundedIcon from '@mui/icons-material/EastRounded';


export const StatBar = ({openAllTransactions, pieChart, shadow}) => {

  return (
    <div
      className={`max-w-[440px] w-full rounded-[10px] bg-white ${shadow} p-[15px] overflow-hidden flex flex-col justify-between`}
    >
      <div>
        <h3 className='leading-[26px] font-semibold'>Balance usage</h3>
        <h4 className='text-[#666]'>Calculated by last activity</h4>
        <div className='max-[1350px]:h-[200px] h-[255px] relative z-1'>
          <div style={pieChart} className='max-[1335px]:scale-[1.1] max-[1165px]:scale-[1.2] max-[1125px]:scale-[1.4] max-[1099px]:z-[1] max-[1020px]:scale-[1.75] w-full h-full absolute z-[3]'>
            <UserPieChart />
          </div>
          <div className='max-[1350px]:h-[200px] absolute top-[0px] w-full h-[255px] flex flex-col items-center justify-center z-[2]'>
            <div className='max-[1615px]:h-[100px] h-[130px] flex flex-col items-center justify-between'>
              <div className='w-[30px] h-[30px] rounded-[50%] bg-[#999] flex justify-center items-center font-bold mb-[5px]'>H</div>
              <h7 className='font-bold'>$15 300</h7>
              <h4 className='text-[#4FBB33] font-semibold'>+42%</h4>
            </div>
          </div>
        </div>
        <div className='min-[1100px]:hidden flex justify-between my-[10px]'>
            {data.map(el => (
              <div key={el.id} id={el.id} className='flex items-center'>
                <div style={{ backgroundColor: el.color }} className={`h-[10px] aspect-square rounded-[50%] mr-[3px]`}/>
                <h5>{el.label}:</h5>
                <h5 className='font-semibold ml-[2px]'>{el.value}</h5>
              </div>
            ))}
          </div>
        <div className='flex flex-col items-center mb-[15px]'>
          <h3 className='font-bold'>$1203</h3>
          <h4 className='font-regular'>Available for withdraw</h4>
        </div>
        <div>
          <Button sx={{ width: '100%', padding: '10px 10px', color: 'white' }} color='primary' variant="contained"><h4 className='text-white'>Withdraw funds</h4></Button>
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
            {latestTransactionsData.slice(0, 3).map(item => (
              <TransactionCard 
                key={item.id}
                id={item.id} 
                date={item.date} 
                amount={item.amount}
              />
            ))}
          </List>
        </div>
        <div className='max-[1099px]:opacity-[1] opacity-0'>
          <Link onClick={openAllTransactions} className='flex items-center justify-between cursor-pointer'>
            <h6 className='text-[green]'>View all transactions</h6>
            <EastRoundedIcon fontSize='sm'/>
          </Link>
        </div>
      </div>
    </div>
  )
}
