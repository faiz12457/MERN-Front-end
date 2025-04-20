import React from "react";
import { CustomCheckbox } from "./CustomCheckbox";
import { Input } from "./Input";
import { Title } from "./Title";
import PayButton from "./PayButton";
import { motion, } from "framer-motion";
import Payment from "./Payment";



function OrderContact() {
    function handleSubmit(e){
        e.preventDefault();
    }
  return (
    <div className="w-[90%] box-border p-3 h-full mt-[50px] mr-3 ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Contact Section */}
        <div className="flex flex-col gap-2.5">
          <Title title={"Contact"} />

          <div className="w-full  h-12">
            {/* <input
              type="email"
              className=" py-3 pl-3 outline-none w-full h-full"
              placeholder="Email"
            /> */}
            <Input type={'text'} name={'email'}  placeholder={'Email'} className="" />
          </div>
          <CustomCheckbox text={"Email me with news and offers"} />
        </div>
        {/* Contact Section End  */}

        {/* Delivery Section */}

        <div className="flex flex-col gap-3.5">
          <Title title={"Delivery"} />

          <div className="h-[300px] gap-x-2.5 gap-y-2.5 grid grid-cols-2 grid-rows-5">
            <FormFieldWrapper className="col-span-2 row-span-1 px-1.5 border border-zinc-300 ">
              <select className="w-full h-full outline-none">
                <option>Pakistan</option>
              </select>
            </FormFieldWrapper>

            <FormFieldWrapper className="col-span-1">
              <Input placeholder="First name" type="text" name={"fname"} />
            </FormFieldWrapper>

            <FormFieldWrapper className="col-span-1">
              <Input placeholder="Last name" type="text" name={"lname"} />
            </FormFieldWrapper>

            <FormFieldWrapper className="col-span-2">
              <Input placeholder="Address" type="text" name={"address"} />
            </FormFieldWrapper>

            <FormFieldWrapper className="col-span-1">
              <Input placeholder="City" type="text" name={"city"} />
            </FormFieldWrapper>

            <FormFieldWrapper className="col-span-1">
              <Input
                placeholder="Postal Code (optional)"
                type="text"
                name={"postalCode"}
              />
            </FormFieldWrapper>

            <FormFieldWrapper className="col-span-2">
              <Input placeholder="Phone" type="tel" name={"phoneNumber"} />
            </FormFieldWrapper>
          </div>

          <CustomCheckbox text={"Save this information for next time"} />
        </div>

        {/* Delivery Section End */}


        {/*Shipping Method */}
           
           <div className="flex flex-col gap-2.5">
            <Title  title={'Shipping method'}/>

            <div className="bg-[#F5F5F5] w-full h-12 border rounded-[8px] flex px-2.5 justify-center items-center">
                <div className="w-full h-auto flex justify-between">
                    <p className="text-[.9rem]">Free Delivery</p>
                    <p className="text-[.9rem] font-medium">FREE</p>
                </div>
            </div>
           </div>


         {/*Shipping Method End  */}



         {/* Payment Section */ }
           <Payment />

           {/* Payment Section End */ }


           {/* Pay button */ }

           <PayButton  title={'PAY AND ORDER'}/>
   {/* Pay button end */ }
      </form>
    </div>
  );
}

export default OrderContact;




const FormFieldWrapper = ({ children, className = "" }) => {
  return (
    <div className={`  ${className}`}>
      {children}
    </div>
  );
};
