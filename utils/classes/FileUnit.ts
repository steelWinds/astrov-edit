import type { FileSystemFileHandle } from 'file-system-access'
import type { FSDataTypes } from '@/store/files-store'
import type { IFSDataUnit } from '@/utils/classes/FSDataUnit'

import async from 'async'

type FileSourceType = 'saving' | 'uploading'

export interface IFileUnit extends IFSDataUnit<FileSystemFileHandle> {
  getText: (legacy: boolean) => Promise<string>;
  getFile: (legacy: boolean) => Promise<string | File>;
  remove: (legacy: boolean) => Promise<any>;
  isSameEntry: (
    entries: OneOr<FSDataTypes>
  ) => Promise<boolean>;
}

export const isFileUnit = (v: any): v is IFileUnit => {
  return !v && v instanceof FileUnit
}

export class FileUnit extends FSDataUnit<FileSystemFileHandle> implements IFileUnit {
  readonly #fileSourceType: FileSourceType

  #fileData: string

  constructor (
    handler: FileSystemFileHandle,
    fileSourceType: FileSourceType
  ) {
    super(handler)

    this.#fileSourceType = fileSourceType
    this.#fileData = ''
  }

  async getFile (legacy: boolean) {
    const isLegacyGetFile = legacy && this.#fileSourceType !== 'uploading'

    return isLegacyGetFile ? this.#fileData! : this.handler.getFile()
  }

  async getText (legacy: boolean) {
    const fileData = await this.getFile(legacy)

    return typeof fileData === 'string' ? fileData : fileData.text()
  }

  // Warn! This function is exprimental, so this may throw an error for old browsers
  async remove (legacy: boolean) {
    if (!('remove' in this.handler) && legacy) {
      throw new Error('Your browser does not support remove files')
    }

    return (this.handler as any).remove()
  }

  async isSameEntry (entries: OneOr<FSDataTypes>): Promise<boolean> {
    if (entries instanceof Array) {
      return async.some(entries, this.isSameEntry)
    } else if (isDirectoryUnit(entries)) {
      const tree = await entries.getTree()

      return this.isSameEntry(tree.files)
    }

    return this.handler.isSameEntry(entries.handler)
  }
}
