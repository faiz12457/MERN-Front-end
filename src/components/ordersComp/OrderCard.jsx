import React from 'react'
import OrderProductCard from './OrderProductCard'

function OrderCard({order,userId}) {
    const {_id,createdAt,status,total,items}=order

    const date = new Date(createdAt);

const options = { month: "short", day: "numeric", year: "numeric" };
const formatted = date.toLocaleDateString("en-US", options).toUpperCase();

  return (
    <div className='shadow border pb-1.5 w-fit h-fit    border-zinc-200 rounded-2xl'>
    <div className='h-fit sm:h-20 flex p-2  sm:py-0 sm:px-7 justify-between'>
    <div className=' h-full w-full flex md:gap-5 items-center justify-between'>
    <div className='flex gap-3 flex-col sm:flex-row w-full justify-between '>
        <div className='flex gap-2 sm:gap-4 md:w-1/2  justify-between '>
        <OrderInfo title={'Order number'} info={_id}  />
        <OrderInfo title={'Date placed'} info={formatted} />

        </div>

        <div className='flex gap-2 sm:gap-4   md:w-1/2 justify-between '>
        <OrderInfo title={'Total amount'} info={total+".00"} />
        <Status title={'Status'} status={status} />

        </div>
        </div>
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
        <div className=''>
        <p className='text-zinc-700 text-sm md:text-[.9rem] text-nowrap font-medium'>{title}</p>
        <p className='text-zinc-500 text-wrap font-medium text-xs md:text-[.8rem]'>{info}</p>
        </div>
    )
}

function Status({title,status}){
    
const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-800",
  Dispatched: "bg-blue-100 text-blue-800",
  "Out for delivery": "bg-purple-100 text-purple-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

    return(
        <div className='text-center '>
        <p className='text-zinc-700 text-sm md:text-[.9rem] font-medium'>{title}</p>
        <span
                  className={`text-xs px-3 block py-1 rounded-full text-nowrap font-medium ${
                    statusStyles[status] || "bg-gray-200 text-gray-700"
                  }`}
                >
                  {status}
                </span>
        </div>
    )
}