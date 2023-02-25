import { useEffect } from "react"
import { motion } from "framer-motion"
import TextField from '@mui/material/TextField';
import { ClickAwayListener } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from "@mui/material/Button";
import { useAccount } from 'wagmi';

export const ModalClaimTokens = ({ onCloseModal }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    document.body.style.maxHeight = '100%'
  }, [])
  const { address } = useAccount()


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      style={{ top: `${window.pageYOffset}px` }}
      className='absolute w-full h-[100vh] left-0 bg-[rgba(0,0,0,.5)] overflow-hidden z-[10] flex items-center justify-center'
    >
      <ClickAwayListener onClickAway={onCloseModal}>
        <motion.div 
          className="w-[360px] h-[450px] mx-[20px] bg-white rounded-[10px] py-[40px] px-[30px] flex items-center"
          initial={{ scale: 0, x: -300, y: 300 }}
          animate={{ scale: 1, x: 0, y: 0 }}
          transition={{ duration: 0.2, type: 'easeIn' }}
        >
          <div className="w-full">
            <div className='flex justify-between items-center mb-[20px]'>
              <h3 className='font-semibold'>Claim tokens</h3>
              <IconButton onClick={onCloseModal}>
                <CancelIcon />
              </IconButton>
            </div>
            <div>
              <h5 className='mb-[5px] text-[#777]'>Your wallet address</h5>
              <div className="font-semibold">
                <TextField sx={{ width: '100%' }} id="outlined-basic" defaultValue={`${address.slice(0,14) + '...' + address.slice(-14)}`} variant="outlined" color="primary" InputProps={{readOnly: true,}} />
              </div>
              <h5 className='mb-[5px] mt-[15px] text-[#777]'>Amount HADA tokens</h5>
              <div className="font-semibold">
                <TextField onChange={(e) => console.log(e)} sx={{ width: '100%' }} type="number" id="outlined-basic" label="" variant="outlined" color="primary" />
              </div>
              <div className="w-full flex justify-center mt-[25px]">
                <Button sx={{ width: '100%', padding: '15px 50px', color: 'white' }} color='primary' variant="contained">Claim</Button>
              </div>
            </div>
          </div>
        </motion.div>
      </ClickAwayListener>
    </motion.div>
  )
}
