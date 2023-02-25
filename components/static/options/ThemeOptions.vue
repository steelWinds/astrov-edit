<template>
  <div class="tw-space-y-4">
    <el-row
      justify="space-between"
      align="middle"
    >
      <h3> Dark Mode </h3>
      <el-switch v-model="isDark" />
    </el-row>

    <el-row
      justify="space-between"
      align="middle"
    >
      <h3> Font family </h3>

      <el-select-v2
        v-model="fontTheme.family"
        :options="fontGroupList"
        filterable
        no-data-text="No families"
        value-key="value.family"
        @change="onChangeFontsStyles"
      >
        <template #empty>
          <el-row
            v-if="pending"
            class="tw-p-3 tw-pt-6"
          >
            <el-col class="tw-mb-3">
              <el-progress
                :percentage="50"
                :indeterminate="true"
                :show-text="false"
              />
            </el-col>

            <el-col class="tw-text-midnight">
              <h5 class="tw-text-md dark:tw-text-white">
                Loading...
              </h5>
            </el-col>
          </el-row>
        </template>
      </el-select-v2>
    </el-row>

    <el-row
      justify="space-between"
      align="middle"
    >
      <h3> Font Size </h3>
      <ClientOnly>
        <el-select-v2
          v-model="fontTheme.size"
          :options="fontSizes"
          filterable
          no-data-text="No sizes"
        />
      </ClientOnly>
    </el-row>

    <el-row
      justify="space-between"
      align="middle"
    >
      <h3> Font Weight </h3>
      <ClientOnly>
        <el-select-v2
          v-model="fontTheme.weight"
          :options="fontWeights"
          :disabled="fontWeights?.length <= 1"
          filterable
          no-data-text="No weights"
        />
      </ClientOnly>
    </el-row>

    <el-row
      justify="space-between"
      align="middle"
    >
      <h3> Font Style </h3>
      <ClientOnly>
        <el-select-v2
          v-model="fontTheme.style"
          :options="fontStyles"
          :disabled="fontStyles?.length <= 1"
          filterable
          no-data-text="No styles"
        />
      </ClientOnly>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store/theme-store'
import { useLocalFonts } from '@/composables/useLocalFonts'
import { groupBy } from 'lodash-es'

const themeStore = useThemeStore()
const { getLocalFonts } = useLocalFonts()
const {
  localFontsList,
  localFontsExecute
} = getLocalFonts()
const { isDark, fontTheme } = storeToRefs(themeStore)
const { data, pending, execute: remoteFontsExecute } = getGFontsList(
  'alpha',
  { immediate: false }
)

const fontList = computed(() => localFontsList.value.concat(data.value?.items ?? []))

const fontGroupList = computed<any>(() => {
  const groups = groupBy(fontList.value, f => 'files' in f ? 'Remote' : 'Local')

  return Object.entries(groups)
    .map(([group, fonts]) => {
      return {
        label: group,
        value: group,
        options: fonts.map(f => ({ label: f.family, value: f }))
      }
    })
})

const currentFont = computed(() => fontList.value
  .find((font) => font.family === fontTheme.value.family)
)

const fontWeights = computed<any>(() => fontTheme.value.availableWeight
  .map((w) => ({ label: w, value: w }))
)

const fontStyles = computed<any>(() => fontTheme.value.availableStyles
  .map((s) => ({ label: s, value: s }))
)

const fontSizes = Array.from({ length: 99 }, (_, i) => ({ value: i + 2, label: i + 2 })) as any

const onChangeFontsStyles = () => {
  if (currentFont.value?.variants) {
    themeStore.setAvailableOptions(currentFont.value?.variants)
  }
}

onMounted(() => {
  localFontsExecute()
  remoteFontsExecute()
})
</script>
