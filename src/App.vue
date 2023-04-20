<template>
  <n-config-provider
    :theme="selectedTheme === 'Dark' ? theme : null"
    :theme-overrides="selectedTheme === 'Dark' ? themeOverrides : null"
  >
    <div class="flex flex-row w-full text-xl mt-2 font-sans font-semibold">
      <div
        class="flex justify-center flex-col w-1/2 h-full overflow-hidden pl-10"
      >
        <h3 class="border-b border-white border-solid border-1 mb-12">
          Clouds & Atmosphere
        </h3>
        <AtmosphereClouds />
      </div>
      <div
        class="flex justify-center flex-col w-1/2 h-full overflow-hidden pl-8 pr-10 ml-8"
      >
        <h3 class="border-b border-white border-solid border-1 mb-12">Wind</h3>
        <WindConditions />
      </div>
    </div>
    <n-button size="large" @click="handleSaveClick" class="mb-4 ml-10"
      >Save</n-button
    >
  </n-config-provider>
</template>

<script lang="ts">
import AtmosphereClouds from './components/AtmosphereClouds.vue'
import WindConditions from './components/WindConditions.vue'
import type { GlobalTheme, GlobalThemeOverrides } from 'naive-ui'
import { NConfigProvider, NButton } from 'naive-ui'
import { useThemeStore } from './stores/state'
import { useWeatherStore } from './stores/state'
import {
  turbulence,
  sfcwind,
  sfcwinddir,
  twokwind,
  twokwinddir,
  eightkwind,
  eightkwinddir
} from './components/WindConditions.vue'

import {
  cloud_options_value,
  cloud_base,
  dust_smoke_visibility,
  thickness,
  isFogEnabled,
  fog_thickness,
  fog_visibility,
  temp,
  pressure,
  halo_main_value,
  density,
  halo_preset_value
} from './components/AtmosphereClouds.vue'

import { ref } from 'vue'

export default {
  components: {
    AtmosphereClouds,
    WindConditions,
    NConfigProvider,
    NButton
  },
  setup() {
    const themeStore = useThemeStore()
    const wx = useWeatherStore()
    const theme = ref<GlobalTheme>(themeStore.theme)
    const selectedTheme = ref<string>(themeStore.getSelectedTheme)
    const themeOverrides = ref<GlobalThemeOverrides>(
      themeStore.getThemeOverrides
    )

    const setThemeOverrides = (overrides: GlobalThemeOverrides) => {
      themeStore.setThemeOverrides(overrides)
    }

    const handleSaveClick = () => {
      wx.setCloudsPreset(
        cloud_base.value,
        density.value,
        cloud_options_value.value,
        thickness.value
      )
      wx.setPressure(pressure.value)
      wx.setFog(fog_thickness.value, fog_visibility.value, isFogEnabled.value)
      wx.setHalo(halo_preset_value.value)
      wx.setWind(
        sfcwind.value,
        sfcwinddir.value,
        twokwind.value,
        twokwinddir.value,
        eightkwind.value,
        eightkwinddir.value
      )
      wx.setTurbulence(turbulence.value)
      wx.setTemp(temp.value)
      console.log(wx.getWx)
    }
    return {
      theme,
      selectedTheme,
      themeOverrides,
      setThemeOverrides,
      handleSaveClick
    }
  }
}
</script>
