import type { UploadFile } from 'element-plus'

import { useFileSystemAccess } from '@vueuse/core'

export type FileMap = Map<UploadFile['uid'], UploadFile>

export const useFilesStore = definePiniaStore('files-store', () => {
  const files = ref<FileMap>(new Map())

  return {
    files
  }
})
