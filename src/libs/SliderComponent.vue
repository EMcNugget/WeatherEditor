<template>
  <n-config-provider
    :theme="selectedTheme === 'Dark' ? theme : null"
    :theme-overrides="selectedTheme === 'Dark' ? themeOverrides : null"
  >
    <n-space vertical>
      <n-form-item :label="labelText" label-style="color: white">
        <n-slider v-model:value="value" :step="1" :max="18000" class="mr-4 ml-0" />
        <n-input-number v-model:value="value" size="small" />
      </n-form-item>
    </n-space>
  </n-config-provider>
</template>

<script lang="ts">
import { darkTheme } from 'naive-ui'
import type { GlobalTheme, GlobalThemeOverrides } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    labelText: {
      type: String,
      default: ''
    }
  },
  setup() {
    const value = ref(9500)
    const theme = ref<GlobalTheme>(darkTheme)
    const selectedTheme = ref('Dark')
    const themeOverrides: GlobalThemeOverrides = {
      common: {
        bodyColor: '#23313f',
        cardColor: '#293949',
        railColor: '#555',
        primaryColorSuppl: '#fff'
      }
    }

    return {
      value,
      theme,
      selectedTheme,
      themeOverrides
    }
  }
})
</script>
