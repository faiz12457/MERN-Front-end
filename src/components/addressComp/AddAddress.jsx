import React from 'react'
import { motion} from "framer-motion";
import { useFormik } from 'formik';
import { registerAddressSchema } from '../../yupSchema/schema';
function AddAddress({setFalse,handleChange:register}) {
    async function onSubmit(values,actions) {
        const obj={
            ...values,
            user:localStorage.getItem("token")
        }
            register(obj)
 actions.resetForm();
 setFalse(false)
    }
  
    const formik = useFormik({
      initialValues: {
        type:"",
        city: "",
        province: "",
        street: "",
        phoneNumber:"",
        postalCode:"",
        country:"",


      },
  
      validationSchema: registerAddressSchema,
      onSubmit,
    });
  
    const {
      values,
      errors,
      handleChange,
      handleSubmit,
      touched,
      handleBlur,
      isSubmitting,
    } = formik;
    const { 
        type,
        city,
        province,
        street,
        phoneNumber,
        postalCode,
        country,
     } = values;
  
  return (
    <form onSubmit={handleSubmit}>
    <div className='flex flex-col gap-5 mb-3'>
         <AddressInput title={"Type"} name="type" placeholder={"Eg. Home, Business"} errors={errors.type} value={type} touched={touched.type} handlechange={handleChange} handleBlur={handleBlur} />
         <AddressInput title={'Street'} name="street" errors={errors.street} value={street} touched={touched.street} handlechange={handleChange} handleBlur={handleBlur} />
         <AddressInput  title={'Postal Code'} name="postalCode" errors={errors.postalCode} value={postalCode} touched={touched.postalCode} handlechange={handleChange} handleBlur={handleBlur} />
         <AddressInput title={'Country'} name="country" errors={errors.country} value={country} touched={touched.country} handlechange={handleChange} handleBlur={handleBlur} />
         <AddressInput title={'Phone Number'} name="phoneNumber" errors={errors.phoneNumber} value={phoneNumber} touched={touched.phoneNumber} handlechange={handleChange} handleBlur={handleBlur} />
         <AddressInput title={'State'} name="province" errors={errors.province} value={province} touched={touched.province} handlechange={handleChange} handleBlur={handleBlur} />
         <AddressInput  title={'City'} name="city" errors={errors.city} value={city} touched={touched.city} handlechange={handleChange} handleBlur={handleBlur} />

         <div className=' flex gap-3 mt-2 w-fit ml-auto'>
            <motion.button
            type='submit'
             whileHover={{
                backgroundColor: "#DB4444",
                scale: 1.02,
                transition: {
                    duration: 0.2,
                    ease: "easeInOut",
                }

            
            }}

            whileTap={{
                scale:1,
                transition: {
                    duration: 0.2,
                    ease: "easeInOut",
                }
            }}
             className='w-16 h-9  text-xs font-medium cursor-pointer rounded bg-black text-white uppercase'>
             
             Add</motion.button>
            <motion.button
            onClick={()=>setFalse(false)}
             whileHover={{
    
                scale: 1.02,
                transition: {
                    duration: 0.2,
                    ease: "easeInOut",
                }

            
            }}

            whileTap={{
                scale:1,
                transition: {
                    duration: 0.2,
                    ease: "easeInOut",
                }
            }} 
            className='bg-white rounded text-xs uppercase w-16 h-9 cursor-pointer font-medium text-[#DB4444] border border-[#DB4444]'
            >Cancle</motion.button>
        </div>
    </div>
    </form>
  )
}

export default AddAddress



function AddressInput({type="text", placeholder,title,handlechange,handleBlur,value,name,touched,errors}){
    return (
        <div className='w-full h-fit flex flex-col gap-1 relative' >
            <label className='text-zinc-800 font-medium text-[1rem] '>{title}</label>
            <input type={type}   placeholder={placeholder}  value={value} name={name} onChange={handlechange} onBlur={handleBlur}
            className='h-10 block placeholder:text-[1.1rem] hover:border-zinc-900 rounded text-zinc-800 w-full border outline-none py-7 text-xl pl-2 border-zinc-400'  />
            {errors&& touched&& <p className='text-red-600 absolute -bottom-[18px] left-0.5 text-xs' >{errors}</p>}
        </div>
    )
}