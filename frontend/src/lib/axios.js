import axios from "axios";
const BASE_URL = import.meta.env.MODE==="development" ? "http://localhost:3000/api" : "https://notes-app-awfe.onrender.com/api"
const api = axios.create({
    baseURL:BASE_URL,
})
export default api;