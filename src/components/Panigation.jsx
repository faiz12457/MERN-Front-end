

import React, { useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function Panigation({totalPages=11}) {

    const [currentPage,setCurrPage]=useState(1);
    function goToPage(page){
        if(currentPage>=1&&currentPage<=totalPages){
            setCurrPage(page);
        }
    }


   function getPagination(){
    const pages=[];
    if(totalPages<=7){
        for(let i=1;i<=totalPages;i++){
            pages.push(i);
        }
    }
    else if(currentPage<=4){
        pages.push(1,2,3,4,5,"...",totalPages);

    }
    else if(currentPage>=totalPages-2){
        pages.push(1,"...",totalPages-4,totalPages-3,totalPages-2,totalPages-1,totalPages);

    }else{
        pages.push(1,"...",currentPage-1,currentPage,currentPage+1,"...",totalPages)
    }
    return pages;

   }




  return (
    <div className='flex mt-7 justify-end w-[90%]  mx-auto '>
    <div className='flex gap-2'>
        <button onClick={()=>goToPage(currentPage-1)} disabled={currentPage === 1} className='disabled:opacity-50 cursor-pointer flex justify-center items-center w-11 h-10 border-[1px] border-zinc-400 rounded-sm'>
 <IoIosArrowBack size={22} />
        </button>

        {
            getPagination().map((page,index)=>{
                return( <button
                  onClick={()=> typeof page==="number" && goToPage(page)}
                 key={index}
                 disabled={page === '...'}
                className={`w-11 h-10
                  border-zinc-400
                  ${currentPage===page&&"bg-zinc-300"}
                   cursor-pointer border-[1px]
                    rounded-sm ${page==="..." ?"bg-white cursor-default border-none":""}`}
                >
                 {page}
                </button>)
            })
        }

        
        <button onClick={()=>goToPage(currentPage+1)} disabled={currentPage === totalPages} className='disabled:opacity-50 border-[1px] border-zinc-400  cursor-pointer flex justify-center items-center w-11 h-10  rounded-sm'>
 <IoIosArrowForward size={22} />
        </button>
    </div>

</div>
  )
}

export default Panigation