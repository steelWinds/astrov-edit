declare type Constructor = abstract new (...args: any) => any

declare type WebfontSortingValues = 'alpha' | 'date' | 'popularity' | 'style' | 'trending';
declare type FontBaseOptions = { [key: string]: string }
declare type FontSource = 'google' | 'local'
declare type FontWeightsKeys = keyof typeof FONT_BASE_WEIGHTS
declare type FontWeightsValues = typeof FONT_BASE_WEIGHTS[FontWeightsKeys]
declare type FontStyles = typeof FONT_BASE_STYLES[number]
declare type AvailableFontWords = FontWeightsKeys | FontStyles

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

interface Window {
  queryLocalFonts: () => FontData<string>[];
}
