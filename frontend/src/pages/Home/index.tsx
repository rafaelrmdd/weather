import { useState } from "react"
import { weather } from "../../services/api/weather";
import { AxiosResponse } from "axios";
import { WeatherApiResponseProps } from "./types";

import sunIcon from "../../assets/sun.png"
import cloudsIcon from "../../assets/clouds.png"
import cloudsLowRainIcon from "../../assets/clouds-low-rain.png"
import rainIcon from "../../assets/rain.png"
import stormIcon from "../../assets/storm.png"

export function Home() {

    const [weatherData, setWeatherData] = useState<WeatherApiResponseProps>()
    const [isShowing, setIsShowing] = useState(false)
    const [inputCityNameValue, setInputCityNameValue] = useState('');

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    const convertKelvinToCelsius = (kelvin: number | undefined) => {
        if (kelvin){
            return Math.round(kelvin - 273.15);
        }
        
        return
    }

    const handleClick = async () => {
        const response: AxiosResponse<WeatherApiResponseProps> = await weather.get('weather', {
            params: {
                q: inputCityNameValue,
                appid: apiKey
            }
        })

        if (response) {
            setWeatherData(response.data);
        }

        setIsShowing(true);
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-cyan-500 ">
            <div className="min-w-80 p-8 pb-20 bg-cyan-900 rounded flex flex-col items-center" >
                <h1 className="text-center text-white text-3xl">Weather</h1>

                <input 
                    type="text" 
                    placeholder="Enter city's name" 
                    onChange={(e) => setInputCityNameValue(e.target.value)}
                    className="w-full outline-0 text-white px-4 py-2 bg-cyan-700 rounded mt-8"
                />

                <button 
                    onClick={handleClick}
                    className="px-4 py-2 bg-cyan-700 rounded mt-6 w-1/2"
                >   
                    Search
                </button>

                {isShowing ? (
                    <div className="mt-20">
                        {/* Icon */}
                        
                        <div>
                            {}
                            <img 
                                src={weatherData?.weather[0].main == "Clouds" ? cloudsIcon :
                                    weatherData?.weather[0].main == "Clear" ? sunIcon :
                                    weatherData?.weather[0].main == "Thunderstorm" ? stormIcon : 
                                    weatherData?.weather[0].main == "Drizzle" ? cloudsLowRainIcon : 
                                    weatherData?.weather[0].main == "Rain" ? rainIcon : 
                                    "Undefined"
                                } 
                                alt="teste" 
                                className="w-24 h-24"
                            />
                        </div>

                        <div className="mt-6">
                            <span className="block text-center text-4xl text-white">
                                {convertKelvinToCelsius(weatherData?.main.temp)}°C
                            </span> 

                            <h2 className="text-center text-white mt-2">
                                {weatherData?.name} <br/>
                                Tempo claro
                            </h2>
                        </div>

                    </div>

                ) : null}
            </div>
        </div>
    )
}