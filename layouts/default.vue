<script setup lang="ts">
import { useDarkTheme } from '@/composables/useDarkTheme'

useDarkTheme()
</script>

<template>
  <el-container>
    <el-header
      class="
        tw-w-full
        tw-z-10
        tw-sticky
        tw-top-0
        tw-left-0
        tw-overflow-x-auto
        tw-overflow-y-hidden
        tw-h-auto
      "
    >
      <UiVHeader />
    </el-header>

    <el-main>
      <slot />
    </el-main>

    <UiVFooter />
  </el-container>
</template>

<style scoped>
.top-panel-grid {
  grid-template-columns: 1fr max-content;
}
</style>
