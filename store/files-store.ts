import type { CustomSaveFilePickerOptions } from 'file-system-access/lib/showSaveFilePicker'
import type { CustomOpenFilePickerOptions } from 'file-system-access/lib/showOpenFilePicker'
import type { WriteChunk } from 'file-system-access/lib/interfaces'
import type { IFileUnit } from '@/utils/classes/FileUnit'

import FileUnit from '@/utils/classes/FileUnit'
import { showOpenFilePicker, showSaveFilePicker } from 'file-system-access'
import { v4 as uuidv4 } from 'uuid'
import { useFileSystemAccess } from '@vueuse/core'

export type FileMap = Map<string, IFileUnit>

export const useFilesStore = definePiniaStore('files-store', () => {
  const files = ref<FileMap>(new Map())
  const { isSupported } = useFileSystemAccess({})

  const isLegacyMode = computed(() => !isSupported.value)
  const filesList = computed(() => Array.from(files.value.values()))

  const verifyPermission = async (fileHandle: FileSystemFileHandle) => {
    const opts: FileSystemHandlePermissionDescriptor = {
      mode: 'readwrite'
    }

    if ((await fileHandle.queryPermission(opts)) === 'granted') {
      return true
    }

    if ((await fileHandle.requestPermission(opts)) === 'granted') {
      return true
    }

    return false
  }

  const openFile = async (options: CustomOpenFilePickerOptions = {}) => {
    const fileHandles = await showOpenFilePicker(options)

    fileHandles.forEach((fileHandle) => {
      addFile(markRaw(new FileUnit(fileHandle, 'uploading')))
    })
  }

  const createFile = async (options: CustomSaveFilePickerOptions = {}) => {
    const fileHandle = await showSaveFilePicker(options)

    addFile(markRaw(new FileUnit(fileHandle, 'saving')))
  }

  const addFile = async (fileUnit: FileUnit) => {
    if (await fileUnit.isSameEntry(filesList.value)) return

    files.value.set(uuidv4(), fileUnit)
  }

  // TODO: crete save and save-as functions
  const save = async (fileUnit: IFileUnit, data: WriteChunk) => {
    if (!(await verifyPermission(fileUnit.handler))) throw new Error('User denied access to file')

    const writable = await fileUnit.handler.createWritable()

    writable.write(data)
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
