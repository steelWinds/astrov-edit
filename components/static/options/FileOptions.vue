<template>
  <div class="tw-flex tw-flex-col">
    <el-upload
      drag
      multiple
      accept="text/*"
      @change="addUploadFile"
      @remove="removeUploadFile"
    >
      <el-icon
        size="60px"
      >
        <el-icon-upload-filled />
      </el-icon>

      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
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
import { storeToRefs } from 'pinia'

const { files } = storeToRefs(useFilesStore())
const { addUploadFile, removeUploadFile } = useUploadFiles(files)
</script>
