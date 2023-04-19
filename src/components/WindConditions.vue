<template>
  <div>
    <n-form-item label="Surface Winds">
      <div class="flex flex-row w-1/2">
        <n-input-number
          id="sfc-winds-input"
          class="w-3/5"
          v-model:value="sfcwind"
        >
          <template #suffix>kts</template>
        </n-input-number>
        <n-input-number
          class="ml-4 w-1/2"
          id="sfc-winds-dir-input"
          v-model:value="sfcwinddir"
        >
          <template #suffix>°</template>
        </n-input-number>
      </div>
    </n-form-item>
    <n-form-item label="Winds at 2000">
      <div class="flex flex-row w-1/2">
        <n-input-number
          class="w-3/5"
          id="twok-wind-input"
          v-model:value="twokwind"
        >
          <template #suffix>kts</template>
        </n-input-number>
        <n-input-number
          class="ml-4 w-1/2"
          id="twok-wind-dir-input"
          v-model:value="twokwinddir"
        >
          <template #suffix>°</template>
        </n-input-number>
      </div>
    </n-form-item>
    <n-form-item label="Winds at 8000">
      <div class="flex flex-row w-1/2">
        <n-input-number
          class="w-3/5"
          id="eightk-wind-input"
          v-model:value="eightkwind"
        >
          <template #suffix>kts</template>
        </n-input-number>
        <n-input-number
          class="ml-4 w-1/2"
          id="eightk-wind-dir-input"
          v-model:value="eightkwinddir"
        >
          <template #suffix>°</template>
        </n-input-number>
      </div>
    </n-form-item>
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
      turbulence: ref(0),
      sfcwind: ref(0),
      sfcwinddir: ref(0),
      twokwind: ref(0),
      twokwinddir: ref(0),
      eightkwind: ref(0),
      eightkwinddir: ref(0)
    }
  }
}
</script>
