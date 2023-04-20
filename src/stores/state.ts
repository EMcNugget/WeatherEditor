import { defineStore } from 'pinia'
import { ref } from 'vue'
import { darkTheme } from 'naive-ui'
import type { GlobalTheme, GlobalThemeOverrides } from 'naive-ui'
import { Weather } from './utils/weather'

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
    setCloudsPreset(
      cloudBase: number,
      cloudDensity?: number,
      cloudPreset?: string,
      cloudThickness?: number
    ) {
      Weather.clouds.base = cloudBase
      Weather.clouds.preset = cloudPreset
      if (cloudPreset) {
        Weather.clouds.density = undefined
        Weather.clouds.thickness = undefined
      } else {
        Weather.clouds.density = cloudDensity
        Weather.clouds.thickness = cloudThickness
      }
    },
    setPressure(pressure: number) {
      Weather.qnh = pressure // implement conversion to mmhg
    },
    setTemp(temp: number) {
      Weather.season.temperature = temp
    },
    setWind(
      sfcwind: number,
      sfcwinddir: number,
      twowind: number,
      twowinddir: number,
      eightwind: number,
      eightwinddir: number
    ) {
      Weather.wind.atGround.speed = sfcwind
      Weather.wind.atGround.dir = sfcwinddir
      Weather.wind.at2000.speed = twowind
      Weather.wind.at2000.dir = twowinddir
      Weather.wind.at8000.speed = eightwind
      Weather.wind.at8000.dir = eightwinddir
    },
    setTurbulence(turb: number) {
      Weather.groundTurbulence = turb
    },
    setFog(fogThickness: number, fogVisibility: number, enabled: boolean) {
      Weather.enable_fog = enabled
      Weather.fog.thickness = fogThickness
      Weather.fog.visibility = fogVisibility
    },
    setDust(dustVisbility: number, enabled: boolean, dustDensity?: number) {
      Weather.enable_dust = enabled
      Weather.dust_density = dustDensity || 0
      /* Still working out what where dust visibility goes, even though its in the DCS MIZ editor*/
    }
  },
  getters: {
    getWx() {
      return Weather
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
