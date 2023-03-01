import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import ClickAwayListener from '@mui/base/ClickAwayListener';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import { useSelector, useDispatch } from "react-redux";

import CircularProgress from '@mui/material/CircularProgress';
import { setClientContractVestingAdress } from "../store/clientSlice";


export const ModalVaultChange = ({ onCloseModal }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    document.body.style.maxHeight = '100%'
  }, [])

  const dispatch = useDispatch()

  const clientContractVestingAddress = useSelector(state => state.client.clientContractVestingAddress)
  const vaultAddresses = useSelector(state => state.client.allVestingAddresses)
  const [selectedVault, setSelectedVault] = useState(null)
  const [vestingAddresses, setVestingAddresses] = useState([])
  const [loader, setLoader] =  useState(true)

  const selectedVaultHandler = (address) => {
    setSelectedVault(address)
    dispatch(setClientContractVestingAdress({clientContractVestingAddress: address}))
    onCloseModal()
  }

  useEffect(() => {
    setVestingAddresses(vaultAddresses)
  }, [vaultAddresses, clientContractVestingAddress])
  console.log(clientContractVestingAddress)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ top: `${window.pageYOffset}px` }}
      className='absolute w-full h-[100vh] left-0 bg-[rgba(0,0,0,.5)] overflow-hidden z-[10] flex items-center justify-center'
    >
      <ClickAwayListener onClickAway={onCloseModal}>
        <motion.div 
          initial={{ scale: 0, x: 400, y: -300 }}
          animate={{ scale: 1, x: 0, y: 0 }}
          transition={{ duration: 0.2, type: 'easeIn' }}
          className="w-[400px] h-[450px] bg-white rounded-[10px] py-[50px] px-[10px] flex flex-col overflow-hidden"
        >
          <motion.div className="w-full overflow-hidden">
            <motion.h3 className="font-semibold px-[10px] mb-[20px]">Select vault</motion.h3>
            <motion.div className="h-[100%] overflow-y-scroll">
            {vestingAddresses.length > 0 ? (
              (vestingAddresses[0].address !== '0xDD' ? (
                (vestingAddresses.map(address => (
                  <motion.div key={address.id} className="flex items-center">
                    <motion.div className={`w-[10px] ml-[5px] h-[10px] ${address.address === clientContractVestingAddress && 'bg-[green]'} border-[1px] border-[#666] rounded-full`}/>
                    <motion.div className="w-full">
                      <List>
                        <ListItem disablePadding={true}>
                          <ListItemButton onClick={() => selectedVaultHandler(address.address)}>
                            {/* <ListItemText sx={{ fontSize: '25px' }} primary="1 account" /> */}
                            <div className="flex w-full justify-between">
                              <h4>{address.address.slice(0,5) + '...' + address.address.slice(-5)}</h4>
                              <h4 className="font-light">{address.amount} HADA</h4>
                            </div>
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </motion.div>
                  <Divider />
                  </motion.div>
                )))
              ) : (
                <h4 className="text-[#666]">You have no vaults</h4>
              ))
            ) : (
              <div className='w-full flex items-center justify-center'>
                {loader ? (
                  <CircularProgress color="success" />
                ) : (
                  <h4>No transactions</h4>
                )}
              </div>
            )}
            </motion.div>

          </motion.div>
        </motion.div>
      </ClickAwayListener>
    </motion.div>
  )
}
