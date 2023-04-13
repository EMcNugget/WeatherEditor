<script setup lang="ts"></script>

<template>
  <n-space vertical>
    <n-form-item :label="labelText" label-style="color: white">
      <n-slider v-model:value="value" :step="1" max="18000"  class="mr-4 ml-0" />
      <n-input-number v-model:value="value" size="small" />
    </n-form-item>
  </n-space>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    labelText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      value: ref(9500) // this will be changed to miz value gotten from state
    }
  }
})
</script>
