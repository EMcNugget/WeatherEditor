export const mmHgToinHG = (mmHG: number) => {
  const qnh = mmHG / 25.4
  return Number(qnh.toFixed(2))
}

export const inHgTommHG = (inHg: number) => {
  return Number(inHg * 25.4)
}

export const ftToM = (value: number) => {
  return value / 0.3048
}

export const MToft = (value: number) => {
  return value * 0.3048
}
