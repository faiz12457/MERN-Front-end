import api from "../../../../api";



export const getSingleUser=async()=>{
    try {
        const token = localStorage.getItem("token");
    
        if (!token) return;
        const res=await api.get(`/auth/me/${token}`)
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
}