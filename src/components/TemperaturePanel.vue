<script setup lang="ts">
import { useCurrentWeatherStore } from '@/stores/weatherCurrent'
import SettingsPanel from './SettingsPanel.vue'
import ForecastContainer from './ForecastContainer.vue'
import helper from '@/stores/helpers'
import { useWeatherForecastStore } from '@/stores/weatherForecast';

const weatherStore = useCurrentWeatherStore()
const forecastStore = useWeatherForecastStore()
</script>

<template>
  <v-card class="mx-auto" width="375">
    <v-card-item>
      <template v-slot:title>
        <v-row>
          <v-col cols="6">{{ weatherStore.currentWeather?.name }}</v-col>
          <v-col>
            <v-row no-gutters align="baseline">
              <v-col cols="3">
                <v-icon>{{ helper.resolveWeatherIcon(weatherStore.currentWeather?.weather[0].icon) }}</v-icon>
              </v-col>
              <v-col>
                <div class="text-caption">
                  {{ weatherStore.currentWeather?.weather[0].description }}
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </template>
      <template v-slot:subtitle>
        <v-row>
          <v-col cols="6">
            {{ weatherStore.getTimestamp }}
          </v-col>
        </v-row>
      </template>
    </v-card-item>
    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col class="text-h2" cols="5">
          <v-row no-gutters>
            {{ weatherStore.getTemperature }}
          </v-row>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col class="text-caption" cols="5">
          Humidity:
          {{ helper.formatPercentage(weatherStore.currentWeather?.main.humidity) }}
        </v-col>
        <v-col class="text-caption"> H: {{ weatherStore.getMaxTemperature }} </v-col>
        <v-col cols="1">
          <v-icon icon="mdi-weather-sunset-up"></v-icon>
        </v-col>
        <v-col class="text-caption">
          {{ weatherStore.getSunrise }}
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col class="text-caption" cols="5"> Feels like: {{ weatherStore.getFeelsLike }} </v-col>
        <v-col class="text-caption"> L: {{ weatherStore.getMinTemperature }} </v-col>
        <v-col cols="1">
          <v-icon icon="mdi-weather-sunset-down"></v-icon>
        </v-col>
        <v-col class="text-caption">
          {{ weatherStore.getSunset }}
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text>
      <v-row no-gutters>
        <v-col cols="1">
          <v-icon size="18" icon="mdi-weather-windy"></v-icon>
        </v-col>
        <v-col class="text-caption"
          >{{ weatherStore.getWindSpeed }}
          {{ helper.degreesToCompass(weatherStore.currentWeather?.wind.deg) }}</v-col
        >
        <v-col v-if="weatherStore.currentWeather?.wind.gust" class="text-caption">
          Gust: {{ weatherStore.getGustSpeed }}
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="1">
          <v-icon size="18" icon="mdi-cloud-outline"></v-icon>
        </v-col>
        <v-col class="text-caption">{{
          helper.formatPercentage(weatherStore.currentWeather?.clouds.all)
        }}</v-col>
      </v-row>
      <v-row no-gutters v-if="weatherStore.currentWeather?.rain">
        <v-col cols="1">
          <v-icon size="18" icon="mdi-water-outline"></v-icon>
        </v-col>
        <v-col class="text-caption">{{ weatherStore.currentWeather?.rain }}</v-col>
      </v-row>
      <v-row no-gutters v-if="weatherStore.currentWeather?.snow">
        <v-col cols="1">
          <v-icon size="18" icon="mdi-snowflake"></v-icon>
        </v-col>
        <v-col class="text-caption">{{ weatherStore.currentWeather?.snow }}</v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="1">
          <v-icon size="18" icon="mdi-eye-outline"></v-icon>
        </v-col>
        <v-col class="text-caption">{{ weatherStore.currentWeather?.visibility }} meters</v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        size="small"
        color="surface-variant"
        variant="text"
        :icon="weatherStore.showExpansion ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="
          () => {
            weatherStore.showExpansion = !weatherStore.showExpansion
            weatherStore.showSettings = false
          }
        "
      ></v-btn>
      <v-spacer></v-spacer>
      <v-btn
        size="small"
        color="surface-variant"
        variant="text"
        icon="mdi-cog-outline"
        @click="
          () => {
            weatherStore.showSettings = !weatherStore.showSettings
            weatherStore.showExpansion = false
          }
        "
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-expansion-panels>
        <v-expansion-panel v-show="weatherStore.showExpansion">
          <ForecastContainer :key="forecastStore.getUrl"></ForecastContainer>
        </v-expansion-panel>
        <v-expansion-panel v-show="weatherStore.showSettings">
          <v-card-text>
            <SettingsPanel></SettingsPanel>
          </v-card-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-expand-transition>
  </v-card>
</template>

<style scoped></style>