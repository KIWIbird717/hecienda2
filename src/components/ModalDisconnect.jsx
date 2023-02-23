import { useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@mui/material"
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { useDisconnect } from 'wagmi'

export const ModalDisconnect = ({ closeModalDisconnect }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    document.body.style.maxHeight = '100%'
  }, [])

  const Disconnect = () => {
    const { disconnect } = useDisconnect()

    return <Button onClick={() => disconnect()} sx={{ width: '110px', padding: '8px 10px', color: 'white', margin: '10px 8px' }} color='secondary' variant="contained">Diconnect</Button>
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      style={{ top: `${window.pageYOffset}px` }}
      className='absolute w-full h-[100vh] left-0 bg-[rgba(0,0,0,.5)] overflow-hidden z-[10] flex items-center justify-center'
    >
      <ClickAwayListener onClickAway={closeModalDisconnect}>
        <motion.div className="w-[330px] h-[380px] bg-white rounded-[10px] py-[50px] px-[30px] flex flex-col items-center justify-center">
          <motion.h3 className='font-semibold text-center mb-[25px]'>Disconnect from session?</motion.h3>
          <motion.h5 className="text-center mb-[25px]">Are you sure you want to disconnect from this session? You can come back anytime.</motion.h5>
          <motion.div className="flex">
            <Button onClick={closeModalDisconnect} sx={{ width: '110px', padding: '8px 10px', color: 'white', margin: '10px 8px' }} color='primary' variant="outlined"><h4 className="text-black text-[0.875rem]">Cancel</h4></Button>
            <Disconnect />
          </motion.div>
        </motion.div>
      </ClickAwayListener>
    </motion.div>
  )
}
