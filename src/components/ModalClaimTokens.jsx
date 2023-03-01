import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import TextField from '@mui/material/TextField';
import { ClickAwayListener } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from "@mui/material/Button";
import { useAccount } from 'wagmi';
import { buyTokens } from '../blockchain/tokenSale'
import { useSelector } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { getMax, getMin } from "../blockchain/tokenSale";
import { tokenSaleAddress, USDTAddress } from "../data/addresses";
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';

export const ModalClaimTokens = ({ onCloseModal }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    document.body.style.maxHeight = '100%'
  }, [])

  const { address } = useAccount()
  const provider = useSelector(state => state.client.provider)
  const [amount, setAmount] = useState(null)
  const [fieldError, setFieldError] = useState({error: false, label: ""})
  const [alert, setAlert] = useState({isAlert: false, alertMsg: '', severity: 'success', link: false})
  const [defaultValue, setDefaultValue] = useState()
  const [maxValue, setMaxValue] = useState(null)
  const [minValue, setMinValue] = useState(null)
  const [buttonDisable, setButtonDisable] = useState(false)

  const buttonHandler = (prop) => {
    setButtonDisable(prop)
  }
  const alertHandler = (prop) => {
    setAlert(prop)
  }

  const fieldHandle = (e) => {
    setFieldError({error: false, label: ""})
    setAmount(prev => /\d+/.test(Number(e)) ? e : prev)
  }

  const setMaxMinContractValue = async () => {
    try {
      await getMax(provider, tokenSaleAddress).then(res => setMaxValue(Number(res._hex) / 10**18))
      await getMin(provider, tokenSaleAddress).then(res => setMinValue(Number(res._hex) / 10**18))
    } catch(err) {
      console.error(err)
    }
  }

  const transactionHandle = async () => {
    if (!provider) throw new Error('Provider doesnt exists')
    if (amount == null | amount == 0) { setFieldError({error: true, label: "please enter amount"}) }
    try{
      if (amount != null && amount != 0) {
        buttonHandler(true)
        await buyTokens(tokenSaleAddress, amount, USDTAddress)
          .then(res => {
            if (res !== undefined || res !== null) {
              alertHandler({isAlert: true, alertMsg: 'Tokens successfully purchased', severity: 'success', link: `https://mumbai.polygonscan.com/tx/${res.transactionHash}`})
              buttonHandler(false)
              console.log(res)
            }
          })
      }
    } catch(err) {
      console.error(err.message)
      buttonHandler(false)
      if (err.message.slice(0,25) == 'user rejected transaction') {
        setAlert({isAlert: true, alertMsg: 'You declined the transaction', severity: 'warning'})
      } else if (err.message.slice(0,23) == 'invalid BigNumber value') {
        setAlert({isAlert: false, alertMsg: '', severity: 'error'})
      } else {
        setAlert({isAlert: true, alertMsg: 'An error occurred while trying to handle the transaction', severity: 'error'})
      }
    }
  }

  function TransitionRight(props) {
    return <Slide {...props} direction="left" />;
  }

  useEffect(() => {
    setMaxMinContractValue()
  }, [provider])


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      style={{ top: `${window.pageYOffset}px` }}
      className='absolute w-full h-[100vh] left-0 bg-[rgba(0,0,0,.5)] overflow-hidden z-[10] flex items-center justify-center'
    >
      <Snackbar 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} 
        open={alert.isAlert} autoHideDuration={8000} 
        onClose={() => setAlert({isAlert: false, alertMsg: '', severity: 'success'})} 
        TransitionComponent={TransitionRight} 
      >
        <Alert onClose={() => setAlert({isAlert: false, alertMsg: '', severity: 'success'})} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.alertMsg}
          {alert.link  ? (
            <div className="ml-[5px]">
              <Link href={alert.link} target="_blank">view transaction info</Link>
            </div>
          ) : (
            null
          )}
        </Alert>
      </Snackbar>
      {/* <ClickAwayListener onClickAway={onCloseModal}> */}
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
              <h5 className='mb-[5px] mt-[10px] text-[#777]'>Amount HADA tokens</h5>
              <div className="font-semibold">
                <TextField
                  value={amount}
                  error={fieldError.error} 
                  onChange={(e) => fieldHandle(e.target.value)} 
                  sx={{ width: '100%' }} 
                  defaultValue={defaultValue} 
                  id="outlined-basic" 
                  label={fieldError.label} 
                  variant="outlined" 
                  color="primary" 
                />
                <div className="w-full flex mt-[5px]">
                  <Button variant="outlined" onClick={() => {setFieldError({error: false, label: ""}); setAmount(minValue)}} sx={{ width: '50%', marginRight: '2.5px' }}>min</Button>
                  <Button variant="outlined" onClick={() => {setFieldError({error: false, label: ""}); setAmount(maxValue)}} sx={{ width: '50%', marginLeft: '2.5px' }}>max</Button>
                </div>
              </div>
              <div className="w-full h-[54.5px] flex justify-center items-center mt-[25px]">
                {buttonDisable ? (<CircularProgress color="success"/>) : (
                  <Button onClick={() => transactionHandle()}  sx={{ width: '100%', padding: '15px 50px', color: 'white' }} color='primary' variant="contained">Claim</Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      {/* </ClickAwayListener> */}
    </motion.div>
  )
}
