interface Cyclones {
  centerX: number
  centerZ: number
  ellipticity: number
  pressure_excess: number
  pressure_spread: number
  rotation: number
}

export interface TWeather {
  atmosphere_type: number
  clouds: {
    preset?: string | undefined
    base: number
    density: number | undefined
    iprecptns: number
    thickness: number | undefined
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
    at2000: {
      dir: number
      speed: number
    }
    at8000: {
      dir: number
      speed: number
    }
    atGround: {
      dir: number
      speed: number
    }
  }
}
