import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAPIStore } from '@/stores/api'
import { useAppStore } from '@/stores/app'
import type { ICurrentWeather } from '@/models/currentWeather'
import helper from '@/stores/helpers'

export const useCurrentWeatherStore = defineStore('currentWeather', {
  state: () => ({
    apiStore: useAPIStore(),
    appStore: useAppStore(),
    search: '',
    currentWeather: ref<ICurrentWeather | undefined>(),
    showExpansion: false,
    showSettings: false
  }),
  getters: {
    getUrl(state): string{

      const lookup = this.search.length > 0 ? `q=${this.search}` : `zip=${this.appStore.zipCode}`

      return `${this.appStore.baseUrl}weather?${lookup}&units=${this.appStore.measurementUnits}&appId=${this.appStore.apiKey}`
    },
    getSunrise(state): string {
      return helper.formatTime(state.currentWeather?.sys.sunrise)
    },
    getSunset(state): string {
      return helper.formatTime(state.currentWeather?.sys.sunset)
    },
    getTemperature(state): string {
      return helper.formatTemp(state.currentWeather?.main.temp)
    },
    getMaxTemperature(state): string {
      return helper.formatTemp(state.currentWeather?.main.temp_max)
    },
    getMinTemperature(state): string {
      return helper.formatTemp(state.currentWeather?.main.temp_min)
    },
    getFeelsLike(state): string {
      return helper.formatTemp(state.currentWeather?.main.feels_like)
    },
    getTimestamp(state): string {
      return helper.formatTime(state.currentWeather?.dt)
    },
    getWindSpeed(state): string {
      return helper.formatSpeed(this.appStore.measurementUnits, state.currentWeather?.wind.speed)
    },
    getGustSpeed(state): string {
      return helper.formatSpeed(this.appStore.measurementUnits, state.currentWeather?.wind.gust)
    },
    getWeatherIconClass(state): string {
      return helper.resolveWeatherIcon(state.currentWeather?.weather[0].icon)
    },
    getTempTypes(state): Array<string> {
      return [helper.FAHRENHEIT, helper.CELSIUS]
    }
  },
  actions: {
    async loadWeather() {
      const result = await this.apiStore.callAPI<ICurrentWeather>({
        url: this.getUrl,
        errorMessage: 'Error'
      })

      this.currentWeather = result
    },
  }
})
