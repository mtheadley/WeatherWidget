import type { ITemperature } from './temperature'
import type { ISystemDetails } from './systemDetails'
import type { ICoordinates } from './coordinates'
import type { IWeather } from './weather'
import type { IWind } from './wind'
import type { IRain } from './rain'
import type { ISnow } from './snow'
import type { IClouds } from './clouds'

//https://openweathermap.org/current

interface ICurrentWeather {
  coord: ICoordinates
  weather: Array<IWeather>
  //Internal parameter
  base: string
  main: ITemperature
  //Visibility, meter. The maximum value of the visibility is 10km
  visibility: number
  wind: IWind
  clouds: IClouds
  rain: IRain
  snow: ISnow
  //Time of data calculation, unix, UTC
  dt: number
  sys: ISystemDetails
  //Shift in seconds from UTC
  timezone: number
  //City ID. Please note that built-in geocoder functionality has been deprecated.
  id: number
  //City name. Please note that built-in geocoder functionality has been deprecated.
  name: string
  //Internal parameter
  cod: number
}

export type { ICurrentWeather }
