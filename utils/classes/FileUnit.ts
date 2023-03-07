import type { FileSystemFileHandle } from 'file-system-access'
import type { DataUnit } from '@/store/files-store'

import DirectoryUnit from '@/utils/classes/DirectoryUnit'

type FileSourceType = 'saving' | 'uploading'

export interface IFileUnit {
  handler: FileSystemFileHandle;
  getText: (legacy: boolean) => Promise<string>;
  getFile: (legacy: boolean) => Promise<string | File>;
  isSameEntry: (
    entries: DataUnit | DataUnit[]
  ) => Promise<boolean>;
}

export default class FileUnit implements IFileUnit {
  readonly #fileHandler: FileSystemFileHandle
  readonly #fileSourceType: FileSourceType

  #fileData: string

  constructor (
    fileHander: FileSystemFileHandle,
    fileSourceType: FileSourceType
  ) {
    this.#fileHandler = fileHander
    this.#fileSourceType = fileSourceType
    this.#fileData = ''
  }

  get handler () {
    return this.#fileHandler
  }

  async getFile (legacy: boolean) {
    const isLegacyGetFile = legacy && this.#fileSourceType !== 'uploading'

    return isLegacyGetFile ? this.#fileData! : this.#fileHandler.getFile()
  }

  async getText (legacy: boolean) {
    const fileData = await this.getFile(legacy)

    return typeof fileData === 'string' ? fileData : fileData.text()
  }

  async isSameEntry (entries: DataUnit | DataUnit[]): Promise<boolean> {
    if (entries instanceof Array) {
      return asyncSome(entries, async fu => this.isSameEntry(fu))
    } else if (entries instanceof DirectoryUnit) {
      const tree = await entries.getTree()

      return this.isSameEntry(tree.files)
    }

    return this.handler.isSameEntry((entries as IFileUnit).handler)
  }
}
