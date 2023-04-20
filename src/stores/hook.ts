import { useWeatherStore } from './state'
import type { TWeather } from './utils/wxtypes'

const useWeather = useWeatherStore()

export const getWeather = (): TWeather => {
  return useWeather.getWx
}

export const inputWeather = (input: object) => {
  useWeather.setAll(input)
}
