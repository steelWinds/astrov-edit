import type { WriteChunk } from 'file-system-access/lib/interfaces'
import type { IFileUnit } from '@/utils/classes/FileUnit'
import type { IDirectoryUnit } from '@/utils/classes/DirectoryUnit'

import { showOpenFilePicker, showSaveFilePicker, showDirectoryPicker } from 'file-system-access'
import { v4 as uuidv4 } from 'uuid'
import { useFileSystemAccess } from '@vueuse/core'
import { useMimesStore } from '@/store/mimes-store'
import async from 'async'

export type FSDataTypes = IFileUnit | IDirectoryUnit
export type UnitMap = Map<string, FSDataTypes>

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

  const addUnit = async <T extends FSDataTypes>(unit: T) => {
    if (unit instanceof FileUnit && await unit.isSameEntry(unitsList.value)) {
      throw new Error('File already exists')
    }

    const uuid = uuidv4()

    units.value.set(uuid, unit)

    return { uuid, unit }
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

    await async.forEach(fileHandles, async handle =>
      addUnit(markRaw(new FileUnit(handle, 'uploading'))))
  }

  const openDir = async () => {
    const dirHandle = await showDirectoryPicker({
      id: 'uploading',
      mode: 'readwrite',
      startIn: 'desktop'
    } as any)

    const dirUnit = new DirectoryUnit(dirHandle)

    await addUnit(markRaw(dirUnit))
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

  const saveFile = async (targetUUID: string, data: WriteChunk) => {
    const target = units.value.get(targetUUID)

    if (!isFileUnit(target)) return

    await verifyPermission(target.handler)

    const writable = await target.handler.createWritable()

    await writable.write(data)

    await writable.close()
  }

  const saveFileAs = async (sourceFileUUID: string) => {
    const target = units.value.get(sourceFileUUID)

    if (!isFileUnit(target)) return

    const { uuid } = await createFile('Untitled', null)

    const fileContents = await target.getText(isLegacyMode.value)

    await saveFile(uuid, fileContents)
  }

  const removeUnit = async (uuid: string, rootDirUUID: string = '') => {
    const target = units.value.get(uuid)
    const rootDir = units.value.get(rootDirUUID)

    if (!target || (!target && !rootDir)) {
      throw new Error('Target not found')
    }

    if (isFileUnit(target) && !rootDirUUID) await target.remove(isLegacyMode.value)
    else if (isDirectoryUnit(rootDir)) await rootDir.remove(target)

    units.value.delete(uuid)
  }

  const clearFiles = () => units.value.clear()

  return {
    units,
    isLegacyMode,
    currentFileUnit,
    currentFileUnitUUID,
    removeUnit,
    openDir,
    openFile,
    createFile,
    clearFiles,
    saveFile,
    saveFileAs
  }
})
