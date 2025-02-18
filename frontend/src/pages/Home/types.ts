interface CoordProps {
    lon: number,
    lat: number
}

interface WeatherProps {
    id: number,
    main: string,
    description: string,
    icon: string
}

interface MainWeatherDataProps {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    sea_level: number,
    grnd_level: number
}

interface WindProps {
    speed: number,
    deg: number
}

interface CloudsProps {
    all: number
}

interface SysProps {
    type: number,
    id: number,
    country: string,
    sunrise: number,
    sunset: number
}

export interface WeatherApiResponseProps {
    coord: CoordProps,
    weather: WeatherProps[],
    base: string,
    main: MainWeatherDataProps,
    visibility: number,
    wind: WindProps,
    clouds: CloudsProps,
    dt: number,
    sys: SysProps,
    timezone: number,
    id: number,
    name: string,
    cod: number
}