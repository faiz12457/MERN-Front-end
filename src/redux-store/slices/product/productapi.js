import api from "../../../../api";





export async function getAllProducts(){
       try {
            const res=await api.get("/products");
            
        return  res.data;
       } catch (error) {
        throw error.response.data
       }

  }