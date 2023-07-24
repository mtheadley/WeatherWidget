const FAHRENHEIT = 'Fahrenheit'
const CELSIUS = 'Celsius'
const IMPERIAL = 'imperial'
const METRIC = 'metric'
const DAY_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

function resolveWeatherIcon(code: string | undefined): string {
  switch (code) {
    case '01d':
      return 'mdi-weather-sunny'
    case '01n':
      return 'mdi-weather-night'
    case '02d':
      return 'mdi-weather-cloudy'
    case '02n':
      return 'mdi-weather-cloudy'
    case '03d':
      return 'mdi-weather-partly-cloudy'
    case '03n':
      return 'mdi-weather-night-partly-cloudy'
    case '04d':
      return 'mdi-weather-cloudy'
    case '04n':
      return 'mdi-weather-cloudy'
    case '09d':
      return 'mdi-weather-rainy'
    case '09n':
      return 'mdi-weather-rainy'
    case '10d':
      return 'mdi-weather-pouring'
    case '10n':
      return 'mdi-weather-pouring'
    case '11d':
      return 'mdi-weather-lightning-rainy'
    case '11n':
      return 'mdi-weather-lightning-rainy'
    case '13d':
      return 'mdi-weather-snowy'
    case '13n':
      return 'mdi-weather-snowy'
    case '50d':
      return 'mdi-weather-sunset'
    case '50n':
      return 'mdi-weather-sunset'
    default:
      return ''
  }
}

function formatTime(epochTime: number | undefined): string {
  if (epochTime === undefined) epochTime = Date.now()

  return new Date(epochTime * 1000).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

function formatTemp(rawTemp: number | undefined): string {
  if (rawTemp === undefined) return ''

  return Math.round(rawTemp).toString() + '\u00B0'
}
function formatSpeed(units: string, speed: number | undefined): string {
  return units === IMPERIAL ? speed?.toFixed(2) + ' mph' : speed + ' kph'
}

function formatSpeedShort(units: string, speed: number | undefined): string {
    return units === IMPERIAL ? speed?.toFixed(0) + 'mph' : speed + 'kph'
  }
function formatPercentage(value: number | undefined): string {
  return (value === undefined) ? '' : value.toFixed(0) + '%'
}
function transformTempType(units: string): string {
  return units === FAHRENHEIT ? IMPERIAL : METRIC
}
function degreesToCompass(degrees: number | undefined): string {
  if (degrees === undefined) return ''
  var val = Math.floor(degrees / 22.5 + 0.5)
  var arr = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW'
  ]
  return arr[val % 16]
}
function resolveDayOfWeek(dateString: string): string {
  return DAY_OF_WEEK[new Date(dateString).getDay()]
}

export default {
  resolveWeatherIcon,
  formatTime,
  degreesToCompass,
  transformTempType,
  formatPercentage,
  formatSpeed,
  formatSpeedShort,
  formatTemp,
  resolveDayOfWeek,
  FAHRENHEIT,
  CELSIUS,
  IMPERIAL,
  METRIC
}
