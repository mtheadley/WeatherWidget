import { defineStore } from "pinia";
import helper from '@/stores/helpers'

export const useAppStore = defineStore("app", {
    state: () => ({
        selectedTempType: helper.FAHRENHEIT,
        measurementUnits: helper.IMPERIAL,
        zipCode: '39567',
        baseUrl: 'https://api.openweathermap.org/data/2.5/',
        apiKey: '<GET_YOUR_OWN_API_KEY>'
    })
})