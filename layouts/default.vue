<script setup lang="ts">
import { useThemeStore } from '@/store/theme-store'
import { useNotificationStore } from '@/store/notification-store'
import { useFileSystemAccess } from '@vueuse/core'

useThemeStore()

const { isSupported: fileSystemSupported } = useFileSystemAccess({})

onMounted(() => {
  const notificationStore = useNotificationStore()

  notificationStore.open(
    'FileSystemAccess',
    !fileSystemSupported.value,
    {
      message: `
        Your browser does not support File System Access API
        your can not create files
      `,
      type: 'warning',
      duration: 999999
    }
  )
})
</script>

<template>
  <el-container class="!tw-h-screen !tw-overflow-hidden">
    <el-header
      height="48"
      class="
        !tw-w-full
        !tw-z-10
        tw-order-last
        tw-fixed
        tw-left-0
        tw-bottom-0
        md:tw-order-first
        md:tw-static
        md:tw-h-10
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
