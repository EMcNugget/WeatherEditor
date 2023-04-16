<template>
  <div>
    <div class="flex flex-row">
      <n-form-item label="Temperature" label-style="color: white">
        <n-input-number
          id="temperature-input"
          v-model:value="temp"
          class="w-40 min-w-24"
          size="small"
        >
          <template #suffix> °C </template>
        </n-input-number>
      </n-form-item>
      <SliderComponent labelText="Cloud Base" class="ml-12" />
    </div>
  </div>
</template>

<script lang="ts">
import SliderComponent from '../libs/SliderComponent.vue'

export default {
  components: {
    SliderComponent
  },
  // prettier-ignore
  data () {
    return {
      temp: 20
    }
  }
}
</script>

<style scoped></style>
