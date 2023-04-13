import { defineStore } from 'pinia'
import type { TWeather } from '@/stores/weather'

export const weatherStore = defineStore('weather', {
  state: () => {
    return {
      // reserved for future use, type is defined in the "TWeather" interface
    }
  }
})
