<script setup lang="ts">
import { useWeatherForecastStore } from '@/stores/weatherForecast'
import ForecastPanel from '@/components/ForecastPanel.vue'
import helper from '@/stores/helpers'

const forecastStore = useWeatherForecastStore()
</script>

<template>
  <v-sheet>
    <v-tabs v-model="forecastStore.selectedTab" color="surface-variant">
      <div v-for="date in forecastStore.getDates">
        <v-tab
          :key="date"
          :value="helper.resolveDayOfWeek(date)"
          :prepend-icon="helper.resolveWeatherIcon(forecastStore.resolveWeatherIconForDate(date))"
          @click="
            () => {
              forecastStore.filterForecastForDate(date)
            }
          "
          >{{ helper.resolveDayOfWeek(date) }}
        </v-tab>
      </div>
    </v-tabs>
    <v-window v-model="forecastStore.selectedTab">
      <div v-for="date in forecastStore.getDates">
        <v-window-item :key="date" :value="helper.resolveDayOfWeek(date)">
          <ForecastPanel></ForecastPanel>
        </v-window-item>
      </div>
    </v-window>
  </v-sheet>
</template>
