import axios, { AxiosInstance } from "axios";


export const weather: AxiosInstance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/'
})