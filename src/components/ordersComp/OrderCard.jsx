import React from 'react'
import OrderProductCard from './OrderProductCard'

function OrderCard({order,userId}) {
    const {_id,createdAt,status,total,items}=order

    const date = new Date(createdAt);

const options = { month: "short", day: "numeric", year: "numeric" };
const formatted = date.toLocaleDateString("en-US", options).toUpperCase();

  return (
    <div className='shadow border pb-1.5 w-fit h-fit   border-zinc-200 rounded-2xl'>
    <div className='h-20 flex  px-7 justify-between'>
    <div className=' h-full w-full flex gap-5 items-center justify-between'>
        <OrderInfo title={'Order number'} info={_id}  />
        <OrderInfo title={'Date placed'} info={formatted} />
        <OrderInfo title={'Total amount'} info={total+".00"} />
        <Status title={'Status'} status={status} />
    </div>
   

    </div>
        <div className='h-[225px] px-1.5 overflow-y-auto'>
        {
            items?.map((item,idx)=>{
                return  <OrderProductCard key={idx} item={item} userId={userId} />
            })
        }
        </div>
    </div>
  )
}

export default OrderCard



function OrderInfo({title,info}){
    return (
        <div>
        <p className='text-zinc-700 text-[.9rem] font-medium'>{title}</p>
        <p className='text-zinc-500 font-medium text-[.8rem]'>{info}</p>
        </div>
    )
}

function Status({title,status}){
    return(
        <div>
        <p className='text-zinc-700 text-[.9rem] font-medium'>{title}</p>
        <p className='text-zinc-500 font-medium text-[.8rem]'>{status}</p>
        </div>
    )
}