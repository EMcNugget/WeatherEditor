/* TODO: Finish halo and dust states */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { darkTheme } from 'naive-ui'
import type { GlobalTheme, GlobalThemeOverrides } from 'naive-ui'
import { Weather } from './utils/weather'
import type { TWeather } from './utils/wxtypes'

const theme = ref<GlobalTheme>(darkTheme)
const selectedTheme = ref('Dark')
const themeOverrides: GlobalThemeOverrides = {
  common: {
    bodyColor: '#23313f',
    cardColor: '#293949',
    railColor: '#555',
    primaryColorSuppl: '#fff'
  }
}

export const useWeatherStore = defineStore('wx', {
  state: () => ({
    wx: Weather
  }),
  actions: {
    updateFogVis(newValue: number) {
      this.wx.fog.visibility = newValue
    },
    updateFogThickness(newValue: number) {
      this.wx.fog.thickness = newValue
    },
    updateCloudBase(newValue: number) {
      this.wx.clouds.base = newValue
    },
    updateCloudThickness(newValue: number) {
      this.wx.clouds.thickness = newValue
    },
    updateDustVis(newValue: number) {
      this.wx.dust_density = newValue
    },
    setAll(input: Partial<TWeather>) {
      if (input !== null) {
        this.wx = { ...this.wx, ...input }
      }
    }
  },
  getters: {
    getWx(): TWeather {
      return this.wx
    }
  }
})

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: darkTheme
  }),
  actions: {
    setTheme(newTheme: GlobalTheme) {
      theme.value = newTheme
    },
    setThemeOverrides(newThemeOverrides: GlobalThemeOverrides) {
      themeOverrides.common = newThemeOverrides.common
    }
  },
  getters: {
    getTheme() {
      return theme.value
    },
    getThemeOverrides() {
      return themeOverrides
    },
    getSelectedTheme() {
      return selectedTheme.value
    }
  }
})
