import type { FileMap } from '@/store/files-store'
import type { UploadFile } from 'element-plus'

export const useUploadFiles = (fileMap: Ref<FileMap>) => {
  const addUploadFile = (file: UploadFile) => {
    if (file.status === 'success') {
      fileMap.value.set(file.uid, file)
    }
  }

  const removeUploadFile = (file: UploadFile) => {
    fileMap.value.delete(file.uid)
  }

  const clearUploadFiles = () => {
    fileMap.value.clear()
  }

  return {
    addUploadFile,
    removeUploadFile,
    clearUploadFiles
  }
}
