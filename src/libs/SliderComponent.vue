<template>
  <NSpace vertical>
    <NFormItem :label="labelText" label-style="color: white">
      <NSlider
        v-model:value="value"
        :step="1"
        :max="18000"
        class="mr-4 ml-0 w-52"
      />
      <NInputNumber v-model:value="value" size="small" class="w-32">
        <template #suffix>{{ suffix }}</template>
      </NInputNumber>
    </NFormItem>
  </NSpace>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    labelText: {
      type: String,
      default: 'Give it a name'
    },
    suffix: {
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
