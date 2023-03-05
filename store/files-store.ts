import type { CustomSaveFilePickerOptions } from 'file-system-access/lib/showSaveFilePicker'
import type { IFileUnit } from '@/utils/classes/FileUnit'

import FileUnit from '@/utils/classes/FileUnit'
import { showOpenFilePicker, showSaveFilePicker } from 'file-system-access'
import { v4 as uuidv4 } from 'uuid'
import { useFileSystemAccess } from '@vueuse/core'

export type FileMap = Map<string, IFileUnit>

export const useFilesStore = definePiniaStore('files-store', () => {
  const files = ref<FileMap>(new Map())
  const { isSupported: isLegacyMode } = useFileSystemAccess({})

  const filesList = computed(() => Array.from(files.value.values()))

  const openFile = async () => {
    const fileHandles = await showOpenFilePicker({ multiple: true })

    fileHandles.forEach((fileHandle) => {
      addFile(markRaw(new FileUnit(fileHandle, 'uploading')))
    })
  }

  const createFile = async (options: CustomSaveFilePickerOptions = {}) => {
    const fileHandle = await showSaveFilePicker(options)

    addFile(markRaw(new FileUnit(fileHandle, 'saving')))
  }

  const addFile = async (file: FileUnit) => {
    if (await file.isSameEntry(filesList.value)) return

    files.value.set(uuidv4(), file)
  }

  const removeFile = (uuid: string) => files.value.delete(uuid)

  const clearFiles = () => files.value.clear()

  return {
    files,
    isLegacyMode,
    openFile,
    createFile,
    addFile,
    removeFile,
    clearFiles
  }
})
