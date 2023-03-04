<script setup lang="ts">
import { useFilesStore } from '@/store/files-store'

const filesStore = useFilesStore()
const attrs = useAttrs()

const form = reactive({
  fileName: '',
  fileExt: null
})

const { data, pending: pendingFileExts } = await useLazyFetch('/api/mimes')

const fullFileName = computed(() => `${form.fileName}${form.fileExt}`)
const fileExt = computed(() => data.value?.exts.map(e => `.${e}`) ?? [])
const fileExtOption = computed<any>(() => fileExt.value
  .map(ext => ({ label: ext, value: ext })))

const createFile = () => {
  filesStore.createFile({
    suggestedName: fullFileName.value,
    types: [
      {
        description: 'Text files',
        accept: {
          'text/*': fileExt.value
        }
      }
    ]
  })
}
</script>

<template>
  <el-form
    :model="form"
    v-bind="attrs"
    @submit="createFile"
    @keyup.enter="createFile"
  >
    <el-form-item>
      <el-input
        v-model="form.fileName"
        placeholder="Input file name"
        :formatter="(value: string) => `${value}`.match(/^[\w|\s]+/gmi)"
        class="input-select"
      >
        <template #append>
          <el-select-v2
            v-model="form.fileExt"
            v-loading="pendingFileExts"
            :disabled="pendingFileExts"
            :options="fileExtOption"
            placeholder="File extension"
            no-data-text="No extensions"
            filterable
            class="loading-mask-10"
          />
        </template>
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button
        class="tw-self-end tw-mt-3 tw-bg-mint tw-text-white tw-ml-auto"
      >
        Create file
      </el-button>
    </el-form-item>
  </el-form>
</template>
