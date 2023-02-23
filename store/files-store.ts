import type { UploadFile } from 'element-plus'

export const useFilesStore = definePiniaStore('files-store', () => {
  const files = ref<Map<UploadFile['uid'], UploadFile>>(new Map())

  const addFile = (file: UploadFile) => {
    if (file.status === 'success') {
      files.value.set(file.uid, file)
    }
  }

  const removeFile = (file: UploadFile) => {
    files.value.delete(file.uid)
  }

  const clearFiles = () => {
    files.value.clear()
  }

  return {
    files,
    clearFiles,
    addFile,
    removeFile
  }
})
