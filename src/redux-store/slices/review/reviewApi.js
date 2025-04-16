import api from "../../../../api"


export const registerReview=async(data)=>{
        try {
            
            const res=await api.post("/review/register",data);
            return res.data;
        } catch (error) {
            throw error.response.data
        }

}


export const getReviews=async(id)=>{
try {
           const res=await api.get(`/review/product/${id}`);
           return res.data;
} catch (error) {
    throw error.response.data.message
    
}

}