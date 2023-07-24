import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAPIStore } from '@/stores/api'
import type { IForecast } from '@/models/forecast'
import { useCurrentWeatherStore } from './weatherCurrent'
import type { IForecastDay } from '@/models/forecastDay'
import { useAppStore } from '@/stores/app'

export const useWeatherForecastStore = defineStore('forecastWeather', {
  state: () => ({
    apiStore: useAPIStore(),
    appStore: useAppStore(),
    currentWeatherStore: useCurrentWeatherStore(),
    numberOfIntervals: 40,
    forecast: ref<IForecast | undefined>(),
    selectedTab: null,
    selectedForecastDay: ref<Array<IForecastDay> | undefined>(),
  }),
  getters: {
    getTimeSegments(): Array<string> {
      return this.forecast ? this.forecast.list.map((a) => a.dt_txt) : []
    },
    getDates(): Array<string> {
      return [...new Set(this.forecast?.list.map((obj) => new Date(obj.dt * 1000).toLocaleDateString()))]
    },
    getUrl(): string {
      return `${this.appStore.baseUrl}forecast?zip=${this.appStore.zipCode}&cnt=${this.numberOfIntervals}&units=${this.appStore.measurementUnits}&appId=${this.appStore.apiKey}`
    },
  },

  actions: {
    async loadForecast() {
      const result = await this.apiStore.callAPI<IForecast>({
        url: this.getUrl,
        errorMessage: 'Error'
      })

      this.forecast = result
    },
    filterForecastForDate(desiredDate: string){
      this.selectedForecastDay = this.forecast?.list.filter(f => new Date(f.dt * 1000).toLocaleDateString("en-US") === desiredDate)
    },
     resolveWeatherIconForDate(desiredDate: string) : string{
      const desiredDayForecast = this.forecast?.list.filter(f => new Date(f.dt * 1000).toLocaleDateString("en-US") === desiredDate)
    
      let codes = desiredDayForecast?.map(d => d.weather[0].icon);
      let codeCount = new Map();
    
      codes?.forEach((singleCode) =>{
          if(codeCount.has(singleCode)) codeCount.set(singleCode, codeCount.get(singleCode)+ 1)
          else{ codeCount.set(singleCode, 1)}
      })
    
      return [...codeCount.entries()].reduce((a, e ) => e[1] > a[1] ? e : a)[0]
    },
  }
})
