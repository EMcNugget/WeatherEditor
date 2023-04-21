<template>
  <div>
    <n-form-item label="Surface Winds">
      <div class="flex flex-row w-1/2">
        <n-input-number
          id="sfc-winds-input"
          class="w-3/5"
          v-model:value="sfcwind"
          :min="0"
        >
          <template #suffix>kts</template>
        </n-input-number>
        <n-input-number
          class="ml-4 w-1/2"
          id="sfc-winds-dir-input"
          v-model:value="sfcwinddir"
          :min="0"
          :format="windDir"
        >
          <template #suffix>°</template>
        </n-input-number>
      </div>
    </n-form-item>
    <n-form-item label="Winds at 2000">
      <div class="flex flex-row w-1/2">
        <n-input-number
          class="w-3/5"
          id="twok-wind-input"
          v-model:value="twokwind"
          :min="0"
        >
          <template #suffix>kts</template>
        </n-input-number>
        <n-input-number
          class="ml-4 w-1/2"
          id="twok-wind-dir-input"
          v-model:value="twokwinddir"
          :min="0"
          :format="windDir"
        >
          <template #suffix>°</template>
        </n-input-number>
      </div>
    </n-form-item>
    <n-form-item label="Winds at 8000">
      <div class="flex flex-row w-1/2">
        <n-input-number
          class="w-3/5"
          id="eightk-wind-input"
          v-model:value="eightkwind"
          :min="0"
        >
          <template #suffix>kts</template>
        </n-input-number>
        <n-input-number
          class="ml-4 w-1/2"
          id="eightk-wind-dir-input"
          v-model:value="eightkwinddir"
          :min="0"
          :format="windDir"
        >
          <template #suffix>°</template>
        </n-input-number>
      </div>
    </n-form-item>
    <n-divider class="divider w-1/2" />
    <n-form-item label="Turbulence">
      <n-input-number
        id="turbulence-input"
        class="w-1/2 min-w-24"
        v-model:value="turbulence"
        size="small"
        :step="3"
        :min="0"
        :max="197"
      >
        <template #suffix> 0.1* ft</template>
      </n-input-number>
    </n-form-item>
  </div>
</template>

<script lang="ts">
import { NFormItem, NInputNumber, NDivider } from 'naive-ui'
import { ref, watch } from 'vue'
import { useWeatherStore } from '../stores/state'

const windDir = (wind: number | null): string => {
  if (wind === null) {
    return ''
  } else if (wind > 359) {
    return '000'
  } else if (wind < 100) {
    let result = wind.toString().padStart(3, '0')
    return result
  } else {
    return wind.toString()
  }
}

export default {
  components: {
    NFormItem,
    NInputNumber,
    NDivider
  },
  setup() {
    const Weather = useWeatherStore()

    const turbulence = ref(Weather.wx.groundTurbulence)
    const sfcwind = ref(Weather.wx.wind.atGround.speed)
    const sfcwinddir = ref(Weather.wx.wind.atGround.dir)
    const twokwind = ref(Weather.wx.wind.at2000.speed)
    const twokwinddir = ref(Weather.wx.wind.at2000.dir)
    const eightkwind = ref(Weather.wx.wind.at8000.speed)
    const eightkwinddir = ref(Weather.wx.wind.at8000.dir)

    watch(
      () => turbulence.value,
      (newValue) => {
        Weather.wx.groundTurbulence = newValue
      }
    )

    watch(
      () => sfcwind.value,
      (newValue) => {
        Weather.wx.wind.atGround.speed = newValue
      }
    )
    watch(
      () => sfcwinddir.value,
      (newValue) => {
        Weather.wx.wind.atGround.dir = newValue
      }
    )
    watch(
      () => twokwind.value,
      (newValue) => {
        Weather.wx.wind.at2000.speed = newValue
      }
    )
    watch(
      () => twokwinddir.value,
      (newValue) => {
        Weather.wx.wind.at2000.dir = newValue
      }
    )
    watch(
      () => eightkwind.value,
      (newValue) => {
        Weather.wx.wind.at8000.speed = newValue
      }
    )
    watch(
      () => eightkwinddir.value,
      (newValue) => {
        Weather.wx.wind.at8000.dir = newValue
      }
    )
    return {
      windDir,
      turbulence,
      sfcwind,
      sfcwinddir,
      twokwind,
      twokwinddir,
      eightkwind,
      eightkwinddir
    }
  }
}
</script>
