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
          v-model:value="halo_preset"
          :options="halo_options"
        />
      </n-form-item>
      <div v-if="halo_preset !== 'o1' && halo_preset !== 'o2'">
        <n-form-item label="Halo Preset" label-style="color: white">
          <n-select
            class="w-full"
            v-model:value="halo_crystal_preset"
            :options="halo_options"
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
          v-model:value="cloud_preset"
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
      <div v-if="cloud_preset === 'Nothing'">
        <SliderComponent
          labelText="Cloud Thickness"
          @update-value="updateCloudThickness"
          :val="cloud_thickness"
          suffix="ft"
        />
        <n-form-item label="Density" label-style="color: white">
          <n-input-number
            id="cloud-thickness-input"
            class="w-full min-w-24"
            v-model:value="cloud_density"
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
import { ref, watch } from 'vue'
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

export default {
  setup() {
    const Weather = useWeatherStore()

    const cloud_preset = Weather.wx.clouds.preset
      ? ref(Weather.wx.clouds.preset)
      : ref('Nothing')
    const cloud_base = ref(Weather.wx.clouds.base)
    const cloud_thickness = ref(Weather.wx.clouds.thickness)
    const cloud_density = ref(Weather.wx.clouds.density)
    const isDustSmokeEnabled = ref(Weather.wx.enable_dust)
    const dust_smoke_visibility = ref(Weather.wx.dust_density)
    const isFogEnabled = ref(Weather.wx.enable_fog)
    const fog_thickness = ref(Weather.wx.fog.thickness)
    const fog_visibility = ref(Weather.wx.fog.visibility)
    const temp = ref(Weather.wx.season.temperature)
    const pressure = ref(Weather.wx.qnh)
    const halo_preset = ref(Weather.wx.halo.preset)
    const halo_crystal_preset = ref(Weather.wx.halo.crystalPreset)

    watch(
      () => isDustSmokeEnabled.value,
      (newValue) => {
        Weather.wx.enable_dust = newValue
      }
    )

    watch(
      () => halo_preset.value,
      (newValue) => {
        Weather.wx.halo.preset = newValue
      }
    )

    watch(
      () => halo_crystal_preset.value,
      (newValue) => {
        Weather.wx.halo.crystalPreset = newValue
      }
    )

    watch(
      () => cloud_preset.value,
      (newValue) => {
        Weather.wx.clouds.preset = newValue
      }
    )

    watch(
      () => cloud_density.value,
      (newValue) => {
        Weather.wx.clouds.density = newValue
      }
    )

    watch(
      () => temp.value,
      (newValue) => {
        Weather.wx.season.temperature = newValue
      }
    )

    watch(
      () => isFogEnabled.value,
      (newValue) => {
        Weather.wx.enable_fog = newValue
      }
    )

    watch(
      () => pressure.value,
      (newValue) => {
        Weather.wx.qnh = newValue
      }
    )

    return {
      updateFogVis: Weather.updateFogVis,
      updateFogThickness: Weather.updateFogThickness,
      updateCloudBase: Weather.updateCloudBase,
      updateCloudThickness: Weather.updateCloudThickness,
      updateDustVis: Weather.updateDustVis,
      cloud_preset,
      cloud_base,
      isFogEnabled,
      isDustSmokeEnabled,
      fog_thickness,
      fog_visibility,
      dust_smoke_visibility,
      cloud_thickness,
      temp,
      pressure,
      halo_preset,
      cloud_density,
      halo_crystal_preset,
      halo_options: [
        { label: 'Off', value: 'Off' },
        { label: 'Auto', value: 'Auto' },
        { label: 'Ice Halo On All Mediums', value: 'o3' },
        { label: 'Ice Halo On High Volumentric Clouds', value: 'o4' },
        {
          label: 'Ice Halo On Cirrus and High Volumentric Clouds',
          value: 'o5'
        },
        { label: 'Ice Halo On Cirrus Clouds', value: 'o6' }
      ],
      crystal_options: [
        { label: 'AllKinds', value: 'AllKinds' },
        { label: 'BasicHaloCircle', value: 'BasicHaloCircle' },
        { label: 'BasicHaloWithSundogs', value: 'BasicHaloWithSundogs' },
        { label: 'BasicSundogsTangents', value: 'BasicSundogsTangents' },
        { label: 'SundogsArcs', value: 'SundogsArcs' },
        { label: 'Tangents', value: 'Tangents' }
      ],
      cloud_options: [
        { label: 'Nothing', value: 'Nothing' }, // Not an actual preset
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
