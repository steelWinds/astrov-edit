import { FONT_BASE_WEIGHTS, FONT_BASE_STYLES } from '@/utils/getFontBaseOptions'

export type WebfontSortingValues = 'alpha' | 'date' | 'popularity' | 'style' | 'trending';
export type FontBaseOptions = { [key: string]: string }
export type FontSource = 'google' | 'local'
export type FontWeightsKeys = keyof typeof FONT_BASE_WEIGHTS
export type FontWeightsValues = typeof FONT_BASE_WEIGHTS[FontWeightsKeys]
export type FontStyles = typeof FONT_BASE_STYLES[number]
export type AvailableFontWords = FontWeightsKeys | FontStyles

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
  style: keyof typeof FONT_BASE_WEIGHTS;
}

declare global {
  interface Window {
    queryLocalFonts: () => FontData<string>[];
  }
}
