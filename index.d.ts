declare type Constructor = abstract new (...args: any) => any

declare type WebfontSortingValues = 'alpha' | 'date' | 'popularity' | 'style' | 'trending';
declare type FontBaseOptions = { [key: string]: string }
declare type FontSource = 'google' | 'local'
declare type FontWeightsKeys = keyof typeof FONT_BASE_WEIGHTS
declare type FontWeightsValues = typeof FONT_BASE_WEIGHTS[FontWeightsKeys]
declare type FontStyles = typeof FONT_BASE_STYLES[number]
declare type AvailableFontWords = FontWeightsKeys | FontStyles

declare type MapPromise<T> = (value: T, index: number, array: T[]) => Promise<any>
declare type OneOr<T> = T | T[]

declare interface LocalFamily {
  family: string;
  variants: string[];
}

declare interface WebfontFamily extends LocalFamily {
  files: { [variant: string]: string };
}

declare interface WebfontList {
  kind: string;
  items: WebfontFamily[];
}

declare interface FontData {
  family: string;
  style: keyof typeof FONT_BASE_WEIGHTS;
}

declare interface Dictionary<T> {
    [Key: string]: T;
}

declare interface DB {
  source: 'iana' | 'apache' | 'nginx';
  extensions: string[];
  compressible: boolean;
  charset: string;
}

interface Window {
  queryLocalFonts: () => FontData<string>[];
}

declare global {
  interface FileSystemHandle {
    remove?: () => void
  }

  interface FileSystemFileHandle {
    remove?: () => void
  }
}

declare module 'mime-db' {
  const db: Dictionary<DB>

  export default db
}
