import type { IFileUnit } from '@/utils/classes/FileUnit'

export interface IDirectoryTreeUnit {
  name: string;
  files: IFileUnit[];
  nested: IDirectoryTreeUnit[];

  addFile(unit: IFileUnit): void;
  addNested(unit: IDirectoryTreeUnit): void;
}

export class DirectoryTreeUnit implements IDirectoryTreeUnit {
  readonly #files: IFileUnit[] = []
  readonly #nested: IDirectoryTreeUnit[] = []

  name: string

  constructor (name: string) {
    this.name = name
  }

  get files () {
    return this.#files
  }

  get nested () {
    return this.#nested
  }

  addFile (unit: IFileUnit) {
    this.#files.push(unit)
  }

  addNested (unit: IDirectoryTreeUnit) {
    this.#nested.push(unit)
  }
}
