import axios from "axios";
const API = axios.create({
  baseURL:import.meta.env.VITE_API_BASE_URL, 
});   


export const getAnnouncements = () => API.get('/announcements');      
export const getEvents =()=> API.get('/events');     
export const getSermons =()=> API.get('/sermon');     
export const getGallery =()=> API.get('/gallery');      

// FIXED: Ensure these route requests use the paymentAPI config instance!
export const paymentOrder = (amountData) => API.post("/payment/order", amountData);  
export const paymentVerify = (verifyData) => API.post("/payment/verify", verifyData);