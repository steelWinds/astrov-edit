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
      const fileUnit = markRaw(new FileUnit(fileHandle, 'uploading'))

      addFile(fileUnit)
    })
  }

  const createFile = async (options: CustomSaveFilePickerOptions = {}) => {
    const fileHandle = await showSaveFilePicker(options)

    const fileUnit = markRaw(new FileUnit(fileHandle, 'saving'))

    addFile(fileUnit)
  }

  const addFile = async (file: FileUnit) => {
    const fileIsExist = await file.isSameEntry(filesList.value)

    if (fileIsExist) return

    const uuid = uuidv4()

    files.value.set(uuid, file)

    console.log(files.value)
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
