export function Input({
  type,
  placeholder,
  name,
  value,
  handlechange,
  handleblur,
  error,
  touched,
}) {
  return (
    <div className="relative w-full h-full ">
    
      <input
        id={name}
        name={name}
        type={type}
        onChange={handlechange}
        onBlur={handleblur}
        value={value}
        placeholder={placeholder}
        className={`peer h-12 w-full border border-gray-300  rounded-md px-3  pt-3 pb-1 text-sm placeholder-transparent focus:outline-none
        focus:ring-2 focus:ring-blue-500  `}
      />
      <label
        htmlFor={name}
        className="absolute left-3 top-1 pointer-events-none
   text-gray-600 text-xs transition-all peer-placeholder-shown:top-4 
   peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-1
    peer-focus:text-xs peer-focus:text-blue-600"
      >
        {placeholder}
      </label>
      {error && touched && <p className="text-xs text-red-600 ml-1 mt-0.5">{error}</p>}
    
    </div>
  );
}
