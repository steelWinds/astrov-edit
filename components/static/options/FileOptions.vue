<template>
  <div class="tw-flex tw-flex-col">
    <el-upload
      drag
      multiple
      accept="text/*"
      @change="filesStore.addFile"
      @remove="filesStore.removeFile"
    >
      <el-icon
        size="60px"
      >
        <el-icon-upload-filled />
      </el-icon>
    </el-upload>

    <el-button
      class="tw-self-end tw-mt-3 tw-bg-mint tw-text-white"
    >
      Upload files
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { useFilesStore } from '@/store/files-store'

const filesStore = useFilesStore()
</script>
