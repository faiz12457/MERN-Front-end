import React, { useState } from 'react'
import { Title } from './Title'

import { motion, } from "framer-motion";

            
       
function Payment() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
            <Title title={'Payment'} />
            <p className="text-[.9rem] text-zinc-500">All transactions are secure and encrypted.</p>

            <motion.div
            
               initial={false}
               animate={{ height: isOpen?"auto": "97px" }}
               transition={{duration:0.3}}
            
             className="w-full overflow-hidden mt-2 h-[300px] rounded-[8px]">

            <div onClick={()=>setIsOpen(false)} className={`w-full cursor-pointer  h-12 ${isOpen?" border-zinc-300 border border-b-0 rounded-tl-[8px] rounded-tr-[8px]":" border rounded-tl-[8px] rounded-tr-[8px]"} `}>
       
              <CustomRadio name={'billing'} value={'cod'} id={'cod'}  title={'Cash on Delivery (COD)'} />



            </div>
              <div onClick={()=>setIsOpen(true)} className={`w-full justify-between  flex cursor-pointer  h-12 ${isOpen?"border rounded-bl-[8px] rounded-br-[8px]": "border border-t-0  border-zinc-300 rounded-bl-[8px] rounded-br-[8px]"}`}>
              
                <CustomRadio name={'billing'} value={'card'} id={'card'} title={'PAYFAST(Pay via Debit/Credit/Wallet/Bank Account)'} />
                
              </div>
              
              

            </motion.div>
         </div>
  )
}

export default Payment





function CustomRadio({type="radio",name,value,title,id}){
  return (
    <label htmlFor={id} class={`cursor-pointer  w-full h-full flex items-center gap-1.5 px-3`}>
    <input
      type={type}
      name={name}
      value={value}
      id={id}
       
      className="hidden peer"
    />
  
     
      <div
        className="h-4 w-4 rounded-full border-[1px] border-zinc-300 
               flex-shrink-0 flex items-center justify-center 
               bg-white
                peer-checked:border-[5px] peer-checked:border-black
               transition-all duration-200"
      />
      
      <span className="text-[#000000] text-[.9rem] ">
      {title}
      </span>
    {value==="card" && <PaymentIcons />}
  </label>
  )
}




export function PaymentIcons({ size = 17, gap = 8 }) {
  const style = { display: 'flex', alignItems: 'center', gap: `${gap}px` };

  return (
    <div style={style} className='ml-auto'>
      {/* Visa (dark grey) */}
       <img  src='./visa.svg' />
       <img  src='./master.svg' />
       <img  src='./unionpay.svg' />

    </div>
  );
}