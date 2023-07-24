interface ISystemDetails {
  //Internal parameter
  type: number
  //Internal parameter
  id: number
  //Internal parameter
  message: string
  //Country code (GB, JP etc.)
  country: string
  //Sunrise time, unix, UTC
  sunrise: number
  //Sunset time, unix, UTC
  sunset: number
  //Part of the day (n - night, d - day) -- only for forecast
  pod: string
}
export type { ISystemDetails }
