<script setup lang="ts">
import { useThemeStore } from '@/store/theme-store'

useThemeStore()
</script>

<template>
  <el-container class="!tw-h-screen !tw-overflow-hidden">
    <el-header
      class="
        !tw-w-full
        !tw-z-10
        !tw-h-10
        tw-order-last
        md:tw-order-first
      "
    >
      <UiVHeader />
    </el-header>

    <el-main>
      <slot />
    </el-main>

    <UiVFooter
      class="
        !tw-h-10
        tw-order-first
        md:tw-order-last
      "
    />
  </el-container>
</template>
