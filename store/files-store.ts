import type { CustomSaveFilePickerOptions } from 'file-system-access/lib/showSaveFilePicker'

import { showOpenFilePicker, showSaveFilePicker } from 'file-system-access'

import { v4 as uuidv4 } from 'uuid'
export interface FileUnit {
  fileHandle: FileSystemFileHandle
}

export type FileMap = Map<string, FileUnit>

export const useFilesStore = definePiniaStore('files-store', () => {
  const files = ref<FileMap>(new Map())

  const filesList = computed(() => Array.from(files.value.values()))

  const openFile = async () => {
    const fileHandles = await showOpenFilePicker({ multiple: true })

    fileHandles.forEach((fileHandle) => {
      addFile({ fileHandle })
    })
  }

  const createFile = async (options: CustomSaveFilePickerOptions = {}) => {
    const fileHandle = await showSaveFilePicker(options)

    addFile({ fileHandle })
  }

  const addFile = async (file: FileUnit) => {
    const fileIsExist = await asyncSome(
      filesList.value,
      async fu => fu.fileHandle.isSameEntry(file.fileHandle)
    )

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
