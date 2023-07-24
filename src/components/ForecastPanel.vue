<script setup lang="ts">
import { useWeatherForecastStore } from '@/stores/weatherForecast'
import ForecastSegment from './ForecastSegment.vue'

const forecastStore = useWeatherForecastStore()
</script>

<template>
  <v-card>
    <v-slide-group model="forecastStore.selectedForecastDay" show-arrows="always">
      <v-slide-group-item
        v-for="singleForecast in forecastStore.selectedForecastDay"
        :key="singleForecast.dt"
      >
        <v-card width="100" min-height="180">
          <ForecastSegment :weatherSegment="singleForecast" ></ForecastSegment>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-card>
</template>

<style scoped>
:deep(.v-slide-group__next){
    flex: 0 1 12px;
    min-width: 12px;
}
:deep(.v-slide-group__prev){
    flex: 0 1 12px;
    min-width: 12px;
}
</style>
