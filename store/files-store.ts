import type { WriteChunk } from 'file-system-access/lib/interfaces'
import type { IFileUnit } from '@/utils/classes/FileUnit'
import type { IDirectoryUnit } from '@/utils/classes/DirectoryUnit'

import FileUnit from '@/utils/classes/FileUnit'
import DirectoryUnit from '@/utils/classes/DirectoryUnit'
import { showOpenFilePicker, showSaveFilePicker, showDirectoryPicker } from 'file-system-access'
import { v4 as uuidv4 } from 'uuid'
import { useFileSystemAccess } from '@vueuse/core'
import { useMimesStore } from '@/store/mimes-store'

export type DataUnit = IFileUnit | IDirectoryUnit
export type UnitMap = Map<string, DataUnit>

export const useFilesStore = definePiniaStore('files-store', () => {
  const mimesStore = useMimesStore()

  const units = ref<UnitMap>(new Map())
  const currentFileUnitUUID = ref<string>()
  const { isSupported } = useFileSystemAccess({})

  const isLegacyMode = computed(() => !isSupported.value)
  const unitsList = computed(() => Array.from(units.value.values()))
  const currentFileUnit = computed(() => units.value.get(currentFileUnitUUID.value ?? ''))

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

  const addUnit = async <T extends FileUnit | IDirectoryUnit>(unit: T) => {
    if (unit instanceof FileUnit && await unit.isSameEntry(unitsList.value)) {
      throw new Error('It\'s same file')
    }

    units.value.set(uuidv4(), unit)

    return unit
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

    for (const handle of fileHandles) {
      await addUnit(markRaw(new FileUnit(handle, 'uploading')))
    }
  }

  const openDir = async () => {
    const dirHandle = await showDirectoryPicker({
      id: 'uploading',
      mode: 'readwrite',
      startIn: 'desktop'
    } as any)

    const dirUnit = new DirectoryUnit(dirHandle)

    addUnit(markRaw(dirUnit))
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

    return addUnit(markRaw(new FileUnit(fileHandle, 'saving')))
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

  const removeFile = (uuid: string) => units.value.delete(uuid)

  const clearFiles = () => units.value.clear()

  return {
    units,
    isLegacyMode,
    currentFileUnit,
    currentFileUnitUUID,
    openFile,
    createFile,
    removeFile,
    clearFiles,
    save,
    saveAs,
    openDir
  }
})
