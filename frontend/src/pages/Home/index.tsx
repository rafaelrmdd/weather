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
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [inputCityNameValue, setInputCityNameValue] = useState('');

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    const convertKelvinToCelsius = (kelvin: number | undefined) => {
        if (kelvin){
            return Math.round(kelvin - 273.15);
        }
        
        return
    }

    const handleClick = async () => {
        setIsLoading(true);

        try{
            const response: AxiosResponse<WeatherApiResponseProps> = await weather.get('weather', {
                params: {
                    q: inputCityNameValue,
                    appid: apiKey
                }
            });
    
            if (response.data) {
                setWeatherData(response.data);
                setIsShowing(true);
                setIsLoading(false);
                setHasError(false);
            }
        }catch(error) {
            console.log("Deu erro: ", error)
            
            setHasError(true);
            setIsShowing(false);
            setIsLoading(false);
        }

    }

    const getWeatherIcon = () => {
        if (weatherData?.weather[0]) {
            switch(weatherData.weather[0].main) {
                case "Clouds":
                    return cloudsIcon;
                case "Clear":
                    return sunIcon
                case "Thunderstorm":
                    return stormIcon
                case "Drizzle":
                    return cloudsLowRainIcon
                case "Rain":
                    return rainIcon         
            }
        }

        return ""
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-violet-600">
            <div 
                className="min-w-80 h-auto p-8 pb-20 bg-violet-500 rounded 
                flex flex-col items-center shadow-black " 
            >
                <h1 className="text-center text-white text-3xl">Weather</h1>

                <input 
                    type="text" 
                    placeholder="Enter city's name" 
                    onChange={(e) => setInputCityNameValue(e.target.value)}
                    className="w-full outline-0 text-black placeholder:text-black px-4 py-2 rounded mt-8 bg-violet-200"
                />

                <button 
                    onClick={handleClick}
                    disabled={isLoading}
                    className="px-4 py-2 bg-violet-600 text-violet-200 rounded 
                    mt-6 w-1/2 hover:cursor-pointer hover:bg-violet-700 disabled:cursor-not-allowed"
                >   
                    {isLoading ? "Searching city..." : "Search"}
                </button>

                {isShowing ? (
                    <div className="mt-20">
                        {/* Icon */}
                        
                        <div>
                            {}
                            <img 
                                src={getWeatherIcon()}
                                alt="teste" 
                                className="w-24 h-24"
                            />
                        </div>

                        <div className="mt-6">
                            <span className="block text-center text-4xl text-violet-200">
                                {convertKelvinToCelsius(weatherData?.main.temp)}°C
                            </span> 

                            <h2 className="text-center text-violet-200 mt-2 capitalize">
                                {weatherData?.name} <br/>
                                {weatherData?.weather[0].description}
                            </h2>
                        </div>

                    </div>

                ) : hasError ? <h1 className="text-rose-600 text-xl mt-6">City not found</h1> : null}
            </div>
        </div>
    )
}