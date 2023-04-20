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

const inHgTommHG = (inHg: number) => {
  const p = inHg * 25.4
  return Number(p)
}

export const useWeatherStore = defineStore('wx', {
  state: () => ({
    wx: Weather
  }),
  actions: {
    setCloudsPreset(
      cloudBase: number,
      cloudDensity?: number,
      cloudPreset?: string,
      cloudThickness?: number
    ) {
      this.wx.clouds.base = cloudBase
      this.wx.clouds.preset = cloudPreset
      this.wx.clouds.density = cloudDensity
      this.wx.clouds.thickness = cloudThickness
    },
    setPressure(pressure: number) {
      this.wx.qnh = inHgTommHG(pressure) // implement conversion to mmhg
    },
    setTemp(temp: number) {
      this.wx.season.temperature = temp
    },
    setWind(
      sfcwind: number,
      sfcwinddir: number,
      twowind: number,
      twowinddir: number,
      eightwind: number,
      eightwinddir: number
    ) {
      this.wx.wind.atGround.speed = sfcwind
      this.wx.wind.atGround.dir = sfcwinddir
      this.wx.wind.at2000.speed = twowind
      this.wx.wind.at2000.dir = twowinddir
      this.wx.wind.at8000.speed = eightwind
      this.wx.wind.at8000.dir = eightwinddir
    },
    setTurbulence(turb: number) {
      this.wx.groundTurbulence = turb
    },
    setFog(fogThickness: number, fogVisibility: number, enabled: boolean) {
      this.wx.enable_fog = enabled
      this.wx.fog.thickness = fogThickness
      this.wx.fog.visibility = fogVisibility
    },
    setDust(dustVisbility: number, enabled: boolean, dustDensity?: number) {
      this.wx.enable_dust = enabled
      this.wx.dust_density = dustDensity || 0
      /* Still working out what where dust visibility goes, even though its in the DCS MIZ editor*/
    },
    setHalo(halo_preset: string, halo_main?: string) {
      // check the json value of the halo type
      this.wx.halo.preset = halo_preset
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
