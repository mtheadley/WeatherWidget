<script setup lang="ts">
import { useCurrentWeatherStore } from '@/stores/weatherCurrent'
import helper from '@/stores/helpers'
import { useWeatherForecastStore } from '@/stores/weatherForecast'
import { useAppStore } from '@/stores/app';

const weatherStore = useCurrentWeatherStore()
const forecastStore = useWeatherForecastStore()
const appStore = useAppStore();
</script>

<template>
  <v-sheet>
    <v-row no-gutters align="center">
      <v-col cols="8">
        <v-combobox
          label="Units"
          :items="weatherStore.getTempTypes"
          v-model="appStore.selectedTempType"
          density="compact"
          variant="outlined"
          @update:model-value="
            () => {
              weatherStore.showSettings = false
              appStore.measurementUnits = helper.transformTempType(
                appStore.selectedTempType
              )
              weatherStore.loadWeather().then(() => forecastStore.loadForecast())
            }
          "
        ></v-combobox>
      </v-col>
    </v-row>
    <v-row no-gutters align="center">
      <v-col cols="8">
        <v-text-field
          density="compact"
          append-inner-icon="mdi-map-marker"
          single-line
          hide-details
          label="Zip Code"
          v-model="appStore.zipCode"
          :placeholder="appStore.zipCode"
        >
        </v-text-field>
      </v-col>
      <v-col cols="2" class="mx-2">
        <v-btn
          class="text-none"
          variant="text"
          border
          @click="
            () => {
              weatherStore.showSettings = false
              weatherStore.loadWeather().then(() => forecastStore.loadForecast())
            }
          "
        >
          Go!
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>
@/stores/app