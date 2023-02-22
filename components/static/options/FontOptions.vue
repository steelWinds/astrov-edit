<template>
  <div class="tw-space-y-4">
    <NSpace justify="space-between">
      <h3> Dark Mode </h3>
      <NSwitch v-model:value="isDark" />
    </NSpace>

    <NSpace justify="space-between">
      <h3> Font Family </h3>
      <n-select
        v-model:value="fontTheme.family"
        filterable
        value-field="label"
        :default-value="fontTheme.family"
        :loading="pending"
        :options="fontList"
        @update:show="fetchFonts"
      />
    </NSpace>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { NSpace, NSwitch, NSelect } from 'naive-ui'
import { useThemeStore } from '@/store/theme-store'

const { isDark, fontTheme } = storeToRefs(useThemeStore())
const { data, pending, execute } = getGFontsList(
  'alpha',
  { immediate: false }
)

const fontList = computed<any>(() => data.value?.items
  .map((font) => ({ label: font.family, value: font }) ?? []))

const fetchFonts = (show: boolean) => {
  if (show && !fontList.value?.length) {
    execute()
  }
}
</script>
