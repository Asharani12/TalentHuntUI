import axios from "axios";
import apiBaseUrl, { apiToken } from "../serviceConfig";

// Create instance called axiosInstance
const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        'Authorization': 'Basic ' + apiToken,
    }
});

export default axiosInstance;