<template>
  <div class="tw-space-y-4">
    <el-row justify="space-between">
      <h3> Dark Mode </h3>
      <el-switch v-model="isDark" />
    </el-row>

    <el-row justify="space-between">
      <h3> Font Family </h3>
      <ClientOnly>
        <el-select-v2
          v-model="fontTheme.family"
          :options="fontList"
          filterable
          placeholder="Select a font-family"
          no-data-text="No fonts"
          @focus="fetchFonts"
        >
          <template #empty>
            <el-row
              class="tw-p-3 tw-pt-6"
            >
              <el-col class="tw-mb-3">
                <el-progress
                  :percentage="50"
                  :indeterminate="true"
                  :show-text="false"
                />
              </el-col>

              <el-col>
                <h5 class="tw-text-md">
                  Loading...
                </h5>
              </el-col>
            </el-row>
          </template>
        </el-select-v2>
      </ClientOnly>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store/theme-store'

const { isDark, fontTheme } = storeToRefs(useThemeStore())
const { data, pending, execute } = getGFontsList(
  'alpha',
  { immediate: false }
)

const fontList = computed<any>(() => data.value?.items
  .map((font) => ({ label: font.family, value: font }) ?? []) ?? [])

const fetchFonts = (show: boolean) => {
  if (show && !fontList.value?.length) {
    execute()
  }
}
</script>
