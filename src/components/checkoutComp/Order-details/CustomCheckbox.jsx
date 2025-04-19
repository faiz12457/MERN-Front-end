import { FiCheck } from "react-icons/fi";
export function CustomCheckbox({text}) {
    return (
        <>
        <div className='flex gap-2'>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="peer hidden"
          defaultChecked={true}
        />
        <div className="
          w-5 h-5 rounded border  border-black bg-white
          peer-checked:bg-black
        "/>
        <FiCheck
          className="
            absolute left-[3px] top-1 z-10  /* center it inside the 20px box */
            hidden peer-checked:block
          "
          size={15}
          color="white"
        />
      </label>
      <p className='text-[#000000] text-[.9rem]'>{text}</p>
      </div>
      </>
    );
  }

