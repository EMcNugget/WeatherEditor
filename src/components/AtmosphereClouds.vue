<template>
  <div class="flex flex-row">
    <n-space vertical>
      <n-form-item label="Temperature" label-style="color: white">
        <n-input-number
          id="temperature-input"
          v-model:value="temp"
          class="w-67 min-w-24"
          size="small"
        >
          <template #suffix> °C </template>
        </n-input-number>
      </n-form-item>
      <n-divider />
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
      <n-divider />
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
      <n-divider />
    </n-space>
    <SliderComponent labelText="Cloud Base" class="ml-8" suffix="ft" />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import SliderComponent from '../libs/SliderComponent.vue'

export default {
  setup() {
    return {
      halo_main_value: ref('o1'),
      halo_preset_value: ref('p1'),
      halo_options: [
        {
          label: 'Off',
          value: 'o1'
        },
        {
          label: 'Auto',
          value: 'o2'
        },
        {
          label: 'Ice Halo On All Mediums',
          value: 'o3'
        },
        {
          label: 'Ice Halo On High Volumentric Clouds',
          value: 'o4'
        },
        {
          label: 'Ice Halo On Cirrus and High Volumentric Clouds',
          value: 'o5'
        },
        {
          label: 'Ice Halo On Cirrus Clouds',
          value: 'o6'
        }
      ],
      halo_preset: [
        {
          label: 'AllKinds',
          value: 'p1'
        },
        {
          label: 'BasicHaloCircle',
          value: 'p2'
        },
        {
          label: 'BasicHaloWithSundogs',
          value: 'p3'
        },
        {
          label: 'BasicSundogsTangents',
          value: 'p4'
        },
        {
          label: 'SundogsArcs',
          value: 'p5'
        },
        {
          label: 'Tangents',
          value: 'p6'
        }
      ]
    }
  },
  components: {
    SliderComponent
  },
  // prettier-ignore
  data () {
    return {
      temp: 20,
      pressure: 29.92
    }
  }
}
</script>

<style scoped></style>
