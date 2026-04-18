// import axios, { AxiosInstance } from "axios"

// const pistonBaseUrl = import.meta.env.VITE_PISTON_API_URL || "https://emkc.org/api/v2/piston"

// const instance: AxiosInstance = axios.create({
//     baseURL: pistonBaseUrl,
//     headers: {
//         "Content-Type": "application/json",
//     },
// })

// export default instance

import axios, { AxiosInstance } from "axios"

const instance: AxiosInstance = axios.create({
    baseURL: "https://wandbox.org/api",
    headers: { "Content-Type": "application/json" },
})

export default instance