import { useWeatherStore } from './state'
import type { TWeather } from '../libs/utils/wxtypes'

export default function getWeather(): TWeather {
  const useWeather = useWeatherStore()
  return useWeather.getWx
}
