<template>
  <NConfigProvider
    :theme="selectedTheme === 'Dark' ? theme : null"
    :theme-overrides="selectedTheme === 'Dark' ? themeOverrides : null"
  >
    <NSpace vertical>
      <NFormItem :label="labelText" label-style="color: white">
        <NSlider v-model:value="value" :step="1" :max="18000" class="mr-4 ml-0" />
        <NInputNumber v-model:value="value" size="small" />
      </NFormItem>
    </NSpace>
  </NConfigProvider>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { GlobalThemeOverrides } from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'
import { useThemeStore } from '@/stores/state'

export default defineComponent({
  props: {
    labelText: {
      type: String,
      default: ''
    }
  },
  setup() {
    const value = ref(9500)
    const themeStore = useThemeStore()
    const theme = ref<GlobalTheme>(themeStore.theme)
    const selectedTheme = ref<string>(themeStore.getSelectedTheme)
    const themeOverrides = ref<GlobalThemeOverrides>(themeStore.getThemeOverrides)

    const setThemeOverrides = (overrides: GlobalThemeOverrides) => {
      themeStore.setThemeOverrides(overrides)
    }

    return {
      value,
      theme,
      selectedTheme,
      themeOverrides,
      setThemeOverrides
    }
  }
})
</script>
