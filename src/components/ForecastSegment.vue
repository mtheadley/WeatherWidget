<script setup lang="ts">
import type { IForecastDay } from '@/models/forecastDay'
import { useAppStore } from '@/stores/app';

import helper from '@/stores/helpers'

const appStore = useAppStore()

const props = defineProps<{ weatherSegment: IForecastDay }>()
</script>

<template>
  <v-col>
    <v-row justify="center" class="text-caption mb-2">{{ helper.formatTime(weatherSegment.dt) }}</v-row>
    <v-row justify="center"
      ><v-icon>{{ helper.resolveWeatherIcon(weatherSegment.weather[0].icon) }}</v-icon>
    </v-row>
    <v-row justify="center">{{ weatherSegment.weather[0].main }}</v-row>
    <v-row justify="center" class="text-h6">
      {{ helper.formatTemp(weatherSegment.main.temp) }}</v-row
    >
    <v-row justify="center" class="text-caption">
      <v-icon icon="mdi-weather-windy" class="mr-1"></v-icon>
      {{ helper.formatSpeedShort(appStore.measurementUnits, weatherSegment.wind.speed) }}
      {{ helper.degreesToCompass(weatherSegment.wind.deg) }}</v-row
    >
    <v-row justify="center" class="text-caption">
      <v-icon icon="mdi-cloud-outline" class="mr-1"></v-icon>
      {{ helper.formatPercentage(weatherSegment.clouds.all) }}
    </v-row>
    <v-row justify="center" class="text-caption"
      ><v-icon align-baseline icon="mdi-water-outline" class="mr-1"></v-icon
      >{{ helper.formatPercentage(weatherSegment.pop * 100) }}
    </v-row>
  </v-col>
</template>

<style scoped></style>
@/stores/app