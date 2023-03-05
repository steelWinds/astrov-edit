import type { FileSystemFileHandle } from 'file-system-access'

type FileSourceType = 'saving' | 'uploading'

export interface IFileUnit {
  handler: FileSystemFileHandle;
  getFile: (legacy: boolean) => Promise<File | string>;
  isSameEntry: (
    entries: IFileUnit | IFileUnit[]
  ) => Promise<boolean>;
}

export default class FileUnit implements IFileUnit {
  #fileHandler: FileSystemFileHandle
  #fileSourceType: FileSourceType
  #fileData?: string

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
    if (legacy && this.#fileSourceType !== 'uploading') {
      return this.#fileData!
    }

    return this.#fileHandler.getFile()
  }

  isSameEntry (entries: IFileUnit | IFileUnit[]): Promise<boolean> {
    if (entries instanceof Array) {
      return asyncSome(entries, async fu => this.isSameEntry(fu))
    }

    return this.handler.isSameEntry(entries.handler)
  }
}
