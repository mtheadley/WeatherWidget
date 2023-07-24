import type { IClouds } from "./clouds"
import type { IRain } from "./rain"
import type { ISnow } from "./snow"
import type { ISystemDetails } from "./systemDetails"
import type { ITemperature } from "./temperature"
import type { IWeather } from "./weather"
import type { IWind } from "./wind"

interface IForecastDay {
    //Time of data forecasted, unix, UTC
    dt: number 
    main: ITemperature
    weather: Array<IWeather>
    clouds: IClouds
    wind: IWind
    //Average visibility, metres. The maximum value of the visibility is 10km
    visibility: number
    //Probability of precipitation. The values of the parameter vary between 0 and 1, where 0 is equal to 0%, 1 is equal to 100%
    pop: number
    //Time of data forecasted, ISO, UTC
    dt_txt: string
    rain: IRain
    snow: ISnow
    sys: ISystemDetails
}

export type { IForecastDay }
