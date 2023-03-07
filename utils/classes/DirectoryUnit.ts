import FileUnit from '@/utils/classes/FileUnit'
import DirectoryTreeUnit from '@/utils/classes/DirectoryTreeUnit'

export interface IDirectoryUnit {
  getTree(): Promise<DirectoryTreeUnit>
}

export default class DirectoryUnit implements IDirectoryUnit {
  readonly #dirHandle: FileSystemDirectoryHandle

  constructor (dirHandle: FileSystemDirectoryHandle) {
    this.#dirHandle = dirHandle
  }

  async getTree () {
    const dirList = new DirectoryTreeUnit(this.#dirHandle.name)

    for await (const unit of this.#dirHandle.values()) {
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
