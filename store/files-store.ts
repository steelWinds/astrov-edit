import type { WriteChunk } from 'file-system-access/lib/interfaces'
import type { IFileUnit } from '@/utils/classes/FileUnit'

import FileUnit from '@/utils/classes/FileUnit'
import { showOpenFilePicker, showSaveFilePicker } from 'file-system-access'
import { v4 as uuidv4 } from 'uuid'
import { useFileSystemAccess } from '@vueuse/core'
import { useMimesStore } from '@/store/mimes-store'

export type FileMap = Map<string, IFileUnit>

export const useFilesStore = definePiniaStore('files-store', () => {
  const mimesStore = useMimesStore()

  const files = ref<FileMap>(new Map())
  const { isSupported } = useFileSystemAccess({})

  const isLegacyMode = computed(() => !isSupported.value)
  const filesList = computed(() => Array.from(files.value.values()))

  // This internal function, so i just throw an error when user denied permission to file
  const verifyPermission = async (fileHandle: FileSystemFileHandle) => {
    const opts: FileSystemHandlePermissionDescriptor = {
      mode: 'readwrite'
    }

    if (
      (await fileHandle.queryPermission(opts)) !== 'granted' &&
      (await fileHandle.requestPermission(opts)) !== 'granted'
    ) {
      throw new Error('User not allowed access to file')
    }
  }

  const addFile = async (fileUnit: FileUnit) => {
    if (await fileUnit.isSameEntry(filesList.value)) {
      throw new Error('It\'s same file')
    }

    const uuid = uuidv4()

    files.value.set(uuid, fileUnit)

    return fileUnit
  }

  const openFile = async () => {
    const fileHandles = await showOpenFilePicker({
      multiple: true,
      types: [
        {
          description: 'Text file',
          accept: {
            'text/*': mimesStore.mimes
          }
        }
      ]
    })

    fileHandles.forEach((fileHandle) => {
      addFile(markRaw(new FileUnit(fileHandle, 'uploading')))
    })
  }

  const createFile = async (fileName: string, fileExt?: string | null) => {
    const fileHandle = await showSaveFilePicker({
      suggestedName: fileName,
      types: [
        {
          description: 'New text file',
          accept: {
            'text/*': fileExt ? [fileExt] : mimesStore.mimes
          }
        }
      ]
    })

    return addFile(markRaw(new FileUnit(fileHandle, 'saving')))
  }

  const save = async (fileUnit: IFileUnit, data: WriteChunk) => {
    await verifyPermission(fileUnit.handler)

    const writable = await fileUnit.handler.createWritable()

    await writable.write(data)

    await writable.close()
  }

  const saveAs = async (sourceFileUnit: IFileUnit) => {
    const fileUnit = await createFile('Untitled', null)

    const fileContents = await sourceFileUnit.getText(isLegacyMode.value)

    await save(fileUnit, fileContents)
  }

  const removeFile = (uuid: string) => files.value.delete(uuid)

  const clearFiles = () => files.value.clear()

  return {
    files,
    isLegacyMode,
    openFile,
    createFile,
    removeFile,
    clearFiles,
    save,
    saveAs
  }
})
