<template>
  <div class="flex flex-row">
    <n-space vertical class="mr-6 w-full">
      <n-form-item label="Temperature" label-style="color: white">
        <n-input-number
          id="temperature-input"
          :min="8.4"
          :max="50"
          v-model:value="temp"
          class="w-full min-w-24"
          size="small"
        >
          <template #suffix> °C </template>
        </n-input-number>
      </n-form-item>
      <n-divider class="divider" />
      <n-form-item label="Pressure" label-style="color: white">
        <n-input-number
          id="pressure-input"
          v-model:value="pressure"
          class="w-full min-w-24"
          size="small"
          :step="0.01"
          :min="28.35"
          :max="31.01"
          :precision="2"
        >
          <template #suffix> inHg </template>
        </n-input-number>
      </n-form-item>
      <n-divider class="divider" />
      <n-form-item label="Ice Halo" label-style="color: white">
        <n-select
          class="w-full"
          v-model:value="halo_main_value"
          :options="halo_options"
        />
      </n-form-item>
      <div v-if="halo_main_value !== 'o1' && halo_main_value !== 'o2'">
        <n-form-item label="Halo Preset" label-style="color: white">
          <n-select
            class="w-full"
            v-model:value="halo_preset_value"
            :options="halo_preset"
          />
        </n-form-item>
      </div>
      <n-divider class="divider" />
      <n-checkbox v-model:checked="isFogEnabled">Toggle Fog</n-checkbox>
      <SliderComponent
        labelText="Fog Visibility"
        v-model:value="fog_visibility"
        @update-value="updateFogVis"
        class="mt-2 w-full"
        suffix="ft"
        :max="19685"
        :disabled="!isFogEnabled"
      />
      <SliderComponent
        labelText="Fog Thickness"
        v-model:value="fog_thickness"
        @update-value="updateFogThickness"
        class="w-full"
        suffix="ft"
        :max="3281"
        :disabled="!isFogEnabled"
      />
    </n-space>
    <n-space vertical class="ml-8 w-full">
      <n-form-item label="Cloud Preset" label-style="color: white">
        <n-select
          class="w-full"
          v-model:value="cloud_options_value"
          :options="cloud_options"
        />
      </n-form-item>
      <n-divider class="divider" />
      <SliderComponent
        labelText="Cloud Base"
        :val="cloud_base"
        suffix="ft"
        @update-value="updateCloudBase"
      />
      <div v-if="cloud_options_value === 'Nothing'">
        <SliderComponent
          labelText="Cloud Thickness"
          @update-value="updateCloudThickness"
          :val="thickness"
          suffix="ft"
        />
        <n-form-item label="Density" label-style="color: white">
          <n-input-number
            id="cloud-thickness-input"
            class="w-full min-w-24"
            v-model:value="density"
            size="small"
            :min="0"
            :max="10"
          />
        </n-form-item>
        <n-divider class="divider" />
      </div>
      <n-checkbox v-model:checked="isDustSmokeEnabled">
        Toggle Dust/Smoke
      </n-checkbox>
      <SliderComponent
        labelText="Dust Smoke Visibility"
        :val="dust_smoke_visibility"
        @update-value="updateDustVis"
        suffix="ft"
        class="mt-2"
        :min="984"
        :max="9843"
        :disabled="!isDustSmokeEnabled"
      />
    </n-space>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import SliderComponent from './SliderComponent.vue'
import {
  NFormItem,
  NInputNumber,
  NSelect,
  NCheckbox,
  NDivider,
  NSpace
} from 'naive-ui'
import { useWeatherStore } from '../stores/state'
import { watch } from 'vue'

const mmHgToinHG = (mmHG: number) => {
  const p = mmHG / 25.4
  return Number(p.toFixed(2))
}

const inHgTommHG = (inHg: number) => {
  const p = inHg * 25.4
  return Number(p)
}

export default {
  setup() {
    const Weather = useWeatherStore().wx
    const wxFunc = useWeatherStore()

    const isFogEnabled = ref(Weather.enable_fog)
    const isDustSmokeEnabled = ref(Weather.enable_dust)
    const cloud_options_value = Weather.clouds.preset
      ? ref(Weather.clouds.preset)
      : ref('Nothing')
    const cloud_base = ref(Weather.clouds.base)
    const dust_smoke_visibility = ref(Weather.dust_density)
    const thickness = ref(Weather.clouds.thickness)
    const fog_thickness = ref(Weather.fog.thickness)
    const fog_visibility = ref(Weather.fog.visibility)
    const temp = ref(Weather.season.temperature)
    const pressure = ref(mmHgToinHG(Weather.qnh))
    const halo_main_value = ref('o1') // Find out what values are
    const density = ref(Weather.clouds.density)
    const halo_preset_value = ref('p1') // Findout what the values are

    watch(
      () => isDustSmokeEnabled.value,
      (newValue) => {
        Weather.enable_dust = newValue
      }
    )

    watch(
      () => cloud_options_value.value,
      (newValue) => {
        Weather.clouds.preset = newValue
      }
    )

    watch(
      () => density.value,
      (newValue) => {
        Weather.clouds.density = newValue
      }
    )

    watch(
      () => temp.value,
      (newValue) => {
        Weather.season.temperature = newValue
      }
    )

    watch(
      () => isFogEnabled.value,
      (newValue) => {
        Weather.enable_fog = newValue
      }
    )

    watch(
      () => pressure.value,
      (newValue) => {
        Weather.qnh = inHgTommHG(newValue)
      }
    )

    return {
      updateFogVis: wxFunc.updateFogVis,
      updateFogThickness: wxFunc.updateFogThickness,
      updateCloudBase: wxFunc.updateCloudBase,
      updateCloudThickness: wxFunc.updateCloudThickness,
      updateDustVis: wxFunc.updateDustVis,
      cloud_options_value,
      cloud_base,
      isFogEnabled,
      isDustSmokeEnabled,
      fog_thickness,
      fog_visibility,
      dust_smoke_visibility,
      thickness,
      temp,
      pressure,
      halo_main_value,
      density,
      halo_preset_value,
      halo_options: [
        { label: 'Off', value: 'o1' },
        { label: 'Auto', value: 'o2' },
        { label: 'Ice Halo On All Mediums', value: 'o3' },
        { label: 'Ice Halo On High Volumentric Clouds', value: 'o4' },
        {
          label: 'Ice Halo On Cirrus and High Volumentric Clouds',
          value: 'o5'
        },
        { label: 'Ice Halo On Cirrus Clouds', value: 'o6' }
      ],
      halo_preset: [
        { label: 'AllKinds', value: 'p1' },
        { label: 'BasicHaloCircle', value: 'p2' },
        { label: 'BasicHaloWithSundogs', value: 'p3' },
        { label: 'BasicSundogsTangents', value: 'p4' },
        { label: 'SundogsArcs', value: 'p5' },
        { label: 'Tangents', value: 'p6' }
      ],
      cloud_options: [
        { label: 'Nothing', value: 'Nothing' },
        { label: 'Light Scattered 1', value: 'Preset1' },
        { label: 'Light Scattered 2', value: 'Preset2' },
        { label: 'High Scattered 1', value: 'Preset3' },
        { label: 'High Scattered 2', value: 'Preset4' },
        { label: 'Scattered 1', value: 'Preset5' },
        { label: 'Scattered 2', value: 'Preset6' },
        { label: 'Scattered 3', value: 'Preset7' },
        { label: 'Scattered 4', value: 'Preset8' },
        { label: 'Scattered 5', value: 'Preset9' },
        { label: 'Scattered 6', value: 'Preset10' },
        { label: 'Scattered 7', value: 'Preset11' },
        { label: 'Broken 1', value: 'Preset12' },
        { label: 'Broken 2', value: 'Preset13' },
        { label: 'Broken 3', value: 'Preset14' },
        { label: 'Broken 4', value: 'Preset15' },
        { label: 'Broken 5', value: 'Preset16' },
        { label: 'Broken 6', value: 'Preset17' },
        { label: 'Broken 7', value: 'Preset18' },
        { label: 'Broken 8', value: 'Preset19' },
        { label: 'Overcast 1', value: 'Preset20' },
        { label: 'Overcast 2', value: 'Preset21' },
        { label: 'Overcast 3', value: 'Preset22' },
        { label: 'Overcast 4', value: 'Preset23' },
        { label: 'Overcast 5', value: 'Preset24' },
        { label: 'Overcast 6', value: 'Preset25' },
        { label: 'Overcast 7', value: 'Preset26' },
        { label: 'Overcast 8', value: 'Preset27' },
        { label: 'Overcast & Rain 1', value: 'RainyPreset1' },
        { label: 'Overcast & Rain 2', value: 'RainyPreset2' },
        { label: 'Overcast & Rain 3', value: 'RainyPreset3' }
      ]
    }
  },
  components: {
    SliderComponent,
    NSpace,
    NFormItem,
    NInputNumber,
    NSelect,
    NCheckbox,
    NDivider
  }
}
</script>
