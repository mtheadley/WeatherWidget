import type { ICoordinates } from "./coordinates"

interface ICity{
    name: string
    coord: ICoordinates
    country: string
    //City population
    population: number
    //Shift in seconds from UTC
    timezone: number
    //Sunrise time, Unix, UTC
    sunrise: number
    //Sunset time, Unix, UTC
    sunset: number
}

export type {ICity}