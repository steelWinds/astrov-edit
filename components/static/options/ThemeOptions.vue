<template>
  <div class="tw-space-y-4">
    <el-row
      justify="space-between"
      align="middle"
    >
      <h3> Dark Mode </h3>
      <el-switch v-model="isDark" />
    </el-row>

    <div
      v-loading="pendingFonts"
      class="tw-grid tw-gap-2"
    >
      <el-row
        class="
          tw-flex-col
          !tw-items-start
          !tw-justify-between
          tw-space-y-2
          ultra-sm:tw-flex-row
          ultra-sm:!tw-space-y-0
        "
        align="middle"
      >
        <h3> Font family </h3>

        <ClientOnly>
          <el-select-v2
            v-model="fontTheme.family"
            :options="fontGroupList"
            filterable
            no-data-text="No families"
            value-key="value.family"
            class="tw-w-full ultra-sm:tw-w-auto"
            @change="onChangeFontsStyles"
          />
        </ClientOnly>
      </el-row>

      <el-row
        class="
          tw-flex-col
          !tw-items-start
          !tw-justify-between
          tw-space-y-2
          ultra-sm:tw-flex-row
          ultra-sm:!tw-space-y-0
        "
        align="middle"
      >
        <h3> Font Size </h3>
        <ClientOnly>
          <el-select-v2
            v-model="fontTheme.size"
            :options="fontSizes"
            filterable
            class="tw-w-full ultra-sm:tw-w-auto"
            no-data-text="No sizes"
          />
        </ClientOnly>
      </el-row>

      <el-row
        class="
          tw-flex-col
          !tw-items-start
          !tw-justify-between
          tw-space-y-2
          ultra-sm:tw-flex-row
          ultra-sm:!tw-space-y-0
        "
        align="middle"
      >
        <h3> Font Weight </h3>
        <ClientOnly>
          <el-select-v2
            v-model="fontTheme.weight"
            :options="fontWeights"
            :disabled="fontWeights?.length <= 1"
            class="tw-w-full ultra-sm:tw-w-auto"
            filterable
            no-data-text="No weights"
          />
        </ClientOnly>
      </el-row>

      <el-row
        class="
          tw-flex-col
          !tw-items-start
          !tw-justify-between
          tw-space-y-2
          ultra-sm:tw-flex-row
          ultra-sm:!tw-space-y-0
        "
        align="middle"
      >
        <h3> Font Style </h3>
        <ClientOnly>
          <el-select-v2
            v-model="fontTheme.style"
            :options="fontStyles"
            :disabled="fontStyles?.length <= 1"
            class="tw-w-full ultra-sm:tw-w-auto"
            filterable
            no-data-text="No styles"
          />
        </ClientOnly>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store/theme-store'
import { useFontStore } from '@/store/font-store'
import { groupBy } from 'lodash-es'

const themeStore = useThemeStore()
const fontStore = useFontStore()
const { isDark } = storeToRefs(themeStore)
const {
  fontTheme,
  fonts,
  currentFont,
  pendingFonts
} = storeToRefs(fontStore)

const fontGroupList = computed<any>(() => {
  const groups = groupBy(fonts.value, f => 'files' in f ? 'Remote' : 'Local')

  return Object.entries(groups)
    .map(([group, fonts]) => {
      return {
        label: group,
        value: group,
        options: fonts.map(f => ({ label: f.family, value: f }))
      }
    })
})

const fontWeights = computed<any>(() => fontTheme.value.availableWeight
  .map((w) => ({ label: w, value: w }))
)

const fontStyles = computed<any>(() => fontTheme.value.availableStyles
  .map((s) => ({ label: s, value: s }))
)

const fontSizes = Array.from({ length: 99 }, (_, i) => ({ value: i + 2, label: i + 2 })) as any

const onChangeFontsStyles = () => {
  if (currentFont.value?.variants) {
    fontStore.setAvailableOptions(currentFont.value?.variants)
  }
}

onMounted(() => {
  fontStore.getFonts()
})
</script>
