import api from "../../../../api"


export const registerReview=async(data)=>{
        try {
            
            const res=await api.post("/review/register",data);
            return res.data;
        } catch (error) {
            throw error.response.data.message
        }

}


export const updateReview=async(data)=>{
    try {
        const res=await api.patch(`/review/update/${data.id}`,data);
        return res.data;
    } catch (error) {
        throw error.response.data.message
    }
}


export const deleteReview=async(id)=>{
        try {
            const res=await api.delete(`/review/delete/${id}`);
            return res.data
            
        } catch (error) {
            throw error.response.data.message
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