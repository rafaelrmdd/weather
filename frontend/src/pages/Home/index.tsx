import { useEffect, useState } from "react"
import { weather } from "../../services/api/weather";
import { AxiosResponse } from "axios";
import { WeatherApiResponseProps } from "./types";

export function Home() {

    const [weatherData, setWeatherData] = useState({})

    const cityName = 'orlando';
    const apiKey = 'aa0509b1d018c4641f9adc50691fbd0b';

    useEffect(() => {
        const fetchWeatherData = async () => {
            const response: AxiosResponse<WeatherApiResponseProps> = await weather.get('weather', {
                params: {
                    q: cityName,
                    appid: apiKey
                }
            })
    
            if (response) {
                setWeatherData(response.data);
            }
        }

        setTimeout(fetchWeatherData, 2000);
    }, [])


    return (
        <div className="w-full h-screen flex justify-center items-center bg-cyan-500 ">
            <div className="p-8 bg-cyan-900 rounded flex flex-col" >
                <input 
                    type="text" 
                    placeholder="enter the country's name" 
                    className="outline-0 text-white"
                />

                <button onClick={() => console.log({weatherData})}>click</button>
            </div>
        </div>
    )
}