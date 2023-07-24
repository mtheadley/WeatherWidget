import type { ICity } from "./city"
import type { IForecastDay } from "./forecastDay"

interface IForecast {
    //Internal parameter
    cod: string
    //Internal parameter
    message: string
    //A number of timestamps returned in the API response
    cnt : number
    list: Array<IForecastDay>
    city: ICity
    
    //generated number when the object is created.
    requestedDt: number
}

export type { IForecast }
