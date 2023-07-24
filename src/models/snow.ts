interface ISnow {
  //(where available) Snow volume for the last 1 hour, mm. Please note that only mm as units of measurement are available for this parameter.
  ['1h']: number
  //(where available) Snow volume for the last 3 hours, mm. PPlease note that only mm as units of measurement are available for this parameter.
  ['3h']: number
}

export type { ISnow }
