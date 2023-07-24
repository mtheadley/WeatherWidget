<script setup lang="ts">
import { useCurrentWeatherStore } from '@/stores/weatherCurrent'
import { useWeatherForecastStore } from '@/stores/weatherForecast'
import TemperaturePanel from '@/components/TemperaturePanel.vue'

const weatherStore = useCurrentWeatherStore()
const forecastStore = useWeatherForecastStore()

weatherStore.loadWeather().then(() => {
  forecastStore.loadForecast()
})
</script>

<template>
  <TemperaturePanel :key="weatherStore.currentWeather?.dt"></TemperaturePanel>
</template>

<style scoped></style>
