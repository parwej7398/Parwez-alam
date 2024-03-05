import axios from "axios";


const baseURL1 = 'https://dummyjson.com/'
const baseURL2 = 'https:/chatmkx.onrender.com/'

export const axiosInstence1 = axios.create({ baseURL: baseURL1 })
export const axiosInstence2 = axios.create({ baseURL: baseURL2 })