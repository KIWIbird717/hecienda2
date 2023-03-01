import { React } from 'react'
// import { Button } from '../components'
import Button from '@mui/material/Button';

export const Banner = () => {
  return (
    <div>
      <div className={`max-[860px]:h-[300px]  w-[100%] h-[350px] rounded-[10px] bg-[url('../media/image.jpg')] bg-cover bg-center flex items-end`}>
        <div className="w-full h-[75%] bg-[#B7B7B7]/[.5] backdrop-blur-[3.5px] rounded-[10px] p-[20px] flex flex-col justify-between">
          <h1 className="text-white uppercase font-semibold cursor-default">It's time to invest in your future now</h1>
          {/* <Button sx={{ width: 'fit-content', padding: '10px 50px', color: 'white' }} color='primary' variant="contained">Withdraw</Button> */}
        </div>
      </div>
    </div>
  )
}
