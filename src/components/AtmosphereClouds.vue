<script setup lang="ts" />
<!--placeholder will be replaced from 0 to temp from miz file-->

<template>
  <div>
    <div class="flex flex-row">
      <n-form-item label="Temperature" label-style="color: white">
        <n-input-number id="temperature-input" placeholder="0" class="w-40 min-w-24" size="small">
          <template #suffix> C </template>
        </n-input-number>
      </n-form-item>
      <SliderComponent labelText="Cloud Base" class="ml-12" />
    </div>
  </div>
</template>

<script>
import SliderComponent from '@/libs/SliderComponent.vue'

export default {
  components: {
    SliderComponent
  }
}
</script>

<style scoped></style>
