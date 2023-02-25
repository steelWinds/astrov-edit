export type WebfontSortingValues = 'alpha' | 'date' | 'popularity' | 'style' | 'trending';
export type TFontBaseWeight = { [key: string]: string }
export type FontSource = 'google' | 'local'

export interface LocalFamily {
  family: string;
  variants: string[];
}

export interface WebfontFamily extends LocalFamily {
  files: { [variant: string]: string };
}

export interface WebfontList {
  kind: string;
  items: WebfontFamily[];
}

export interface FontData {
  family: string;
  style: string;
}

declare global {
  interface Window {
    queryLocalFonts: () => FontData<string>[];
  }
}
