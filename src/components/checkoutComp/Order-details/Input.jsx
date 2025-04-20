export function Input({type,placeholder,name,value,handlechange,handleblur,error,touched}){
    return(
      <div className="relative w-full h-full border border-zinc-300 rounded-lg flex items-center ">
      <input
        id={name}
        name={name}
        type={type}
        onChange={handlechange}
        onBlur={handleblur}
        value={value}
        placeholder=" "  
        required 
      
        className="
          peer
          w-full
          h-full
          bg-transparent
          appearance-none
          outline-none
          text-sm
          px-4
        "
      />
    
      <label
        htmlFor={name}
        className="
          absolute
          left-4
          top-1/2
          transform -translate-y-1/2
    
          pointer-events-none
          transition-all
          duration-200
    
          text-zinc-500
          text-base
    
          /* empty state: centered */
          peer-placeholder-shown:top-1/2
          peer-placeholder-shown:-translate-y-1/2
    
        
          
    
          peer-valid:top-2.5
          peer-valid:-translate-y-2
          peer-valid:text-xs
          peer-valid:text-zinc-700
        "
      >
        {placeholder}
      </label>
    </div>
    
    )

}; 




// peer-focus:top-2.5
// peer-focus:-translate-y-2
// peer-focus:text-xs
// peer-focus:text-zinc-700