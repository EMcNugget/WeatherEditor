interface Cyclones {
  centerX: number
  centerZ: number
  ellipticity: number
  pressure_excess: number
  pressure_spread: number
  rotation: number
}

interface Wind {
  dir: number
  speed: number
}

export type TWeather = {
  weather: {
    atmosphere_type: number
    clouds: {
      base: number
      density: number
      iprecptns: number
      thickness: number
    }
    cyclones: Cyclones[]
    dust_density: number
    enable_dust: boolean
    enable_fog: boolean
    fog: {
      thickness: number
      visibility: number
    }
    groundTurbulence: number
    halo: {
      preset: string
    }
    modifiedTime: boolean
    name: string // 'Winter, clean sky'
    qnh: number
    season: {
      temperature: number
    }
    type_weather: number
    visibility: {
      distance: number
    }
    wind: {
      at2000: Wind
      at8000: Wind
      atGround: Wind
    }
  }
}
