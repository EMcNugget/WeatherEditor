<template>
  <NSpace vertical>
    <NFormItem :label="labelText" label-style="color: white">
      <NSlider v-model:value="value" :step="1" :max="18000" class="mr-4 ml-0" />
      <NInputNumber v-model:value="value" size="small" />
    </NFormItem>
  </NSpace>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    labelText: {
      type: String,
      default: ''
    }
  },
  // prettier-ignore
  setup () {
    const value = ref(9500)

    return {
      value
    }
  }
})
</script>
