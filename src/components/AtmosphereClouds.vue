<template>
  <div class="flex flex-row">
    <n-space vertical class="mr-6">
      <n-form-item label="Temperature" label-style="color: white">
        <n-input-number
          id="temperature-input"
          :min="8.4"
          :max="50"
          v-model:value="temp"
          class="w-67 min-w-24"
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
          class="w-67 min-w-24"
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
          class="w-67"
          v-model:value="halo_main_value"
          :options="halo_options"
        />
      </n-form-item>
      <div v-if="halo_main_value !== 'o1' && halo_main_value !== 'o2'">
        <n-form-item label="Halo Preset" label-style="color: white">
          <n-select
            class="w-67"
            v-model:value="halo_preset_value"
            :options="halo_preset"
          />
        </n-form-item>
      </div>
      <n-divider class="divider" />
      <n-form-item label="Turbulence">
        <n-input-number
          id="turbulence-input"
          class="w-67 min-w-24"
          v-model:value="turbulence"
          size="small"
          :step="3"
          :min="0"
          :max="197"
        >
          <template #suffix> 0.1* ft</template>
        </n-input-number>
      </n-form-item>
      <n-divider class="divider" />
      <n-checkbox v-model:checked="isFogEnabled">Toggle Fog</n-checkbox>
      <SliderComponent
        labelText="Fog Visibility"
        class="mt-2 w-67"
        suffix="ft"
        :max="19685"
        :disabled="isFogDisabled"
      />
      <SliderComponent
        labelText="Fog Thickness"
        class="w-67"
        suffix="ft"
        :max="3281"
        :disabled="isFogDisabled"
      />
    </n-space>
    <n-space vertical class="ml-8 w-67">
      <n-form-item label="Cloud Preset" label-style="color: white">
        <n-select
          class="w-67"
          v-model:value="cloud_options_value"
          :options="cloud_options"
        />
      </n-form-item>
      <n-divider class="divider" />
      <SliderComponent labelText="Cloud Base" :val="base" suffix="ft" />
      <div v-if="cloud_options_value === 'Preset0'">
        <SliderComponent
          labelText="Cloud Thickness"
          :val="thickness"
          suffix="ft"
        />
        <n-form-item label="Density" label-style="color: white">
          <n-input-number
            id="cloud-thickness-input"
            class="w-67 min-w-24"
            v-model:value="density"
            size="small"
            :min="0"
            :max="10"
          />
        </n-form-item>
      </div>
      <n-checkbox v-model:checked="isDustSmokeEnabled">
        Toggle Dust/Smoke
      </n-checkbox>
      <SliderComponent
        labelText="Dust Smoke Visibility"
        :val="dust_smoke_visibility"
        suffix="ft"
        class="mt-2"
        :min="984"
        :max="9843"
        :disabled="isDustSmokeDisabled"
      />
    </n-space>
  </div>
</template>

<script lang="ts">
import { ref, watchEffect } from 'vue'
import SliderComponent from '../libs/SliderComponent.vue'

export default {
  setup() {
    const isFogEnabled = ref(false)
    const isFogDisabled = ref(true)

    const isDustSmokeEnabled = ref(false)
    const isDustSmokeDisabled = ref(true)

    watchEffect(() => {
      isFogDisabled.value = !isFogEnabled.value
      isDustSmokeDisabled.value = !isDustSmokeEnabled.value
    })

    return {
      cloud_options_value: ref('Preset0'),
      isFogEnabled,
      isFogDisabled,
      isDustSmokeEnabled,
      isDustSmokeDisabled,
      dust_smoke_visibility: ref(984),
      base: ref(8202),
      thickness: ref(656),
      fog_disabled: ref(false),
      temp: ref(15),
      pressure: ref(29.92), // Add conversion to hPa
      turbulence: ref(0),
      halo_main_value: ref('o1'),
      density: ref(0),
      halo_preset_value: ref('p1'),
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
        { label: 'Nothing', value: 'Preset0' },
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
        { label: 'Overcast & Rain 1', value: 'Preset28' },
        { label: 'Overcast & Rain 2', value: 'Preset29' },
        { label: 'Overcast & Rain 3', value: 'Preset30' }
      ]
    }
  },
  components: {
    SliderComponent
  }
}
</script>

<style scoped>
.divider {
  margin-top: 0%;
  margin-bottom: 0.2rem;
  margin-left: 0;
}
</style>
