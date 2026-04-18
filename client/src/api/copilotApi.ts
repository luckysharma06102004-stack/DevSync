import axios, { AxiosInstance } from "axios"

const pollinationsBaseUrl = "https://api.openai.com/v1"

const instance: AxiosInstance = axios.create({
    baseURL: pollinationsBaseUrl,
    
    headers: {
        "Content-Type": "application/json",
    },
    
})

export default instance
