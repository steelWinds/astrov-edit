import type { IDirectoryTreeUnit } from '@/utils/classes/DirectoryTreeUnit'
import type { FSDataTypes } from '@/store/files-store'
import type { IFSDataUnit } from '@/utils/classes/FSDataUnit'

import async from 'async'
import { FSDataUnit } from '@/utils/classes/FSDataUnit'

export interface IDirectoryUnit extends IFSDataUnit<FileSystemDirectoryHandle> {
  getTree(): Promise<IDirectoryTreeUnit>
  remove(unit: OneOr<FSDataTypes>): Promise<any>
}

export const isDirectoryUnit = (v: any): v is IDirectoryUnit => {
  return !v && v instanceof DirectoryUnit
}

export class DirectoryUnit extends FSDataUnit<FileSystemDirectoryHandle> implements IDirectoryUnit {
  async #removeEntry (unit: FSDataTypes) {
    return this.handler.removeEntry(unit.name, {
      recursive: isDirectoryUnit(unit.handler)
    })
  }

  remove (unit: OneOr<FSDataTypes>) {
    return unit instanceof Array
      ? async.forEach(unit, this.#removeEntry)
      : this.#removeEntry(unit)
  }

  async getTree () {
    const dirList = new DirectoryTreeUnit(this.name)

    for await (const unit of this.handler.values()) {
      let creatingUnit = null

      if (unit.kind === 'file') {
        creatingUnit = new FileUnit(unit, 'uploading')

        dirList.addFile(creatingUnit)
      } else if (unit.kind === 'directory') {
        const dirUnit = new DirectoryUnit(unit)

        creatingUnit = await dirUnit.getTree()

        dirList.addNested(creatingUnit)
      }
    }

    return dirList
  }
}
