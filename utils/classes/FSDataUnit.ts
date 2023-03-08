export interface IFSDataUnit<T> {
  name: string;
  handler: T;
}

export class FSDataUnit<T extends FileSystemHandle> implements IFSDataUnit<T> {
  readonly #handle: T

  public readonly name: string

  constructor (handle: T) {
    this.#handle = handle

    this.name = handle.name
  }

  get handler () {
    return this.#handle
  }
}
