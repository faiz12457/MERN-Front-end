import { useState, useEffect } from "react";

export function useFilter(data,key,filterValue ) {
  const [filteredData, setFilteredData] = useState([]);


  function getValueFromPath(obj,key){
  return  key.split(".").reduce((acc,key)=>acc?.[key],obj)
  }

  useEffect(() => {
    if (!filterValue ||!key) {
        setFilteredData(data);
      } 
      else{ 
          const result = data.filter((d)=>getValueFromPath(d,key)===filterValue);
          setFilteredData(result);
        }

  }, [data,filterValue,key]); 
  return filteredData;
}
