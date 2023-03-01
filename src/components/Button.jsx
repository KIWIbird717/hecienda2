import React from 'react'
import { motion } from 'framer-motion'

export const Button = ({ button, text, href, style='px-[60px]' }) => {
  return (
    <>
    {button ? (
      <motion.button 
        onClick={() => console.log("Clicked")}
        className={`bg-green text-white font-bold py-[13px] w-[fit-content] rounded-[4px] hover:bg-[#84b157] ease-in duration-100 ${style}`}
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 0.99 }}
        transition={{ duration: 0.01, type: 'spring' }}
      >
        <h4 className="font-semibold">{text}</h4>
      </motion.button>
    ) : (
      <motion.a
        href={href}
        className={`bg-green text-white font-bold py-[13px] rounded-[4px] hover:bg-[#84b157] ease-in duration-100 ${style}`}
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 0.99 }}
        transition={{ duration: 0.01, type: 'spring' }}
      >
        <h4 className="font-semibold">{text}</h4>
      </motion.a>
    )}
    </>
  )
}
