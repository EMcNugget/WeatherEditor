<template>
  <div>
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
import { ref } from 'vue'

export default {
  components: {
    NFormItem,
    NInputNumber,
    NDivider
  },
  setup() {
    return {
      turbulence: ref(0)
    }
  }
}
</script>

<style scoped></style>
