import type { IFileUnit } from '@/utils/classes/FileUnit'

export interface IDirectoryTreeUnit {
  name: string;

  addFile(unit: IFileUnit): void;
  addNested(unit: IDirectoryTreeUnit): void;
}

export default class DirectoryTreeUnit implements IDirectoryTreeUnit {
  readonly #files: IFileUnit[] = []
  readonly #nested: IDirectoryTreeUnit[] = []

  name: string

  constructor (name: string) {
    this.name = name
  }

  addFile (unit: IFileUnit) {
    this.#files.push(unit)
  }

  addNested (unit: IDirectoryTreeUnit) {
    this.#nested.push(unit)
  }
}
