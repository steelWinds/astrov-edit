<script setup lang="ts">
import { useFilesStore } from '@/store/files-store'
import { useMimesStore } from '@/store/mimes-store'

const filesStore = useFilesStore()
const mimesStore = useMimesStore()

const attrs = useAttrs()

interface FormType {
  fileName: string;
  fileExt?: string | null;
}

const form = reactive<FormType>({
  fileName: '',
  fileExt: null
})

const fileExtOption = computed<any>(() => mimesStore.mimes
  .map(ext => ({ label: ext, value: ext })) ?? [])

const formatFileName = (value: string) => `${value}`.match(/^[\w|\s]+/gmi)
const createFile = elMessage(() => {
  return filesStore.createFile(form.fileName, form.fileExt)
}, { success: 'File added successfully' })
</script>

<template>
  <el-form
    :model="form"
    v-bind="attrs"
  >
    <el-form-item>
      <el-input
        v-model="form.fileName"
        placeholder="Input file name"
        :formatter="formatFileName"
        class="input-select"
        clearable
        @keyup.enter.self="createFile"
      >
        <template #append>
          <el-select-v2
            v-model="form.fileExt"
            :options="fileExtOption"
            autocomplete="inline"
            placeholder="File extension"
            no-data-text="No extensions"
            filterable
            clearable
            class="loading-mask-10"
          />
        </template>
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button
        class="tw-self-end tw-mt-3 tw-bg-mint tw-text-white tw-ml-auto"
        @click="createFile"
      >
        Create file
      </el-button>
    </el-form-item>
  </el-form>
</template>
