import type { UseFileSystemAccessReturn } from '@vueuse/core'
import type { CustomSaveFilePickerOptions } from 'file-system-access/lib/showSaveFilePicker'

import { showOpenFilePicker, showSaveFilePicker } from 'file-system-access'

import { v4 as uuidv4 } from 'uuid'
export interface FileUnit {
  file: File;
  fileHandle: FileSystemFileHandle
}

export type FileMap = Map<string, FileUnit>

export const useFilesStore = definePiniaStore('files-store', () => {
  const files = ref<FileMap>(new Map())

  const filesList = computed(() => Array.from(files.value.values()))

  const openFile = async () => {
    const fileHandles = await showOpenFilePicker({ multiple: true })

    const files = await Promise.allSettled(fileHandles.map(fh => fh.getFile()))

    files.forEach((f, idx) => {
      if (f.status === 'fulfilled') {
        addFile({ file: f.value, fileHandle: fileHandles[idx] })
      }

      // TODO: add catch error handler
    })
  }

  const createFile = async (options: CustomSaveFilePickerOptions = {}) => {
    const fileHandle = await showSaveFilePicker(options)

    const file = await fileHandle.getFile()

    addFile({ file, fileHandle })
  }

  const addFile = (file: FileUnit) => {
    const fileIsExist = filesList.value.some(fu => fu.fileHandle.isSameEntry(file.fileHandle))

    if (fileIsExist) return

    const uuid = uuidv4()

    files.value.set(uuid, file)
  }

  const removeFile = (uuid: string) => files.value.delete(uuid)

  const clearFiles = () => files.value.clear()

  return {
    files,
    openFile,
    createFile,
    addFile,
    removeFile,
    clearFiles
  }
})
