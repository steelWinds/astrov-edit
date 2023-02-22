import type { UploadFileInfo as FileInfo } from 'naive-ui'

export const useFilesStore = definePiniaStore('files-store', () => {
  const files = ref<FileInfo[]>([])

  const updateFilesList = (filesList: FileInfo[]) => {
    files.value = filesList.filter((item) => !item.status.includes('error'))
  }

  const clearFilesList = () => {
    files.value = []
  }

  const filesList = computed(() => files.value
    .filter((file) => file.file)
    .map((file) => file.file!))

  return {
    filesList,
    clearFilesList,
    updateFilesList
  }
})
