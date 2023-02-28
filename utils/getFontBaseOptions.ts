import type { AvailableFontWords } from '@/utils'

export const FONT_BASE_WEIGHTS = {
  thin: '100',
  extralight: '200',
  semilight: '350',
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
  extrablack: '950'
} as const

export const FONT_BASE_STYLES = ['normal', 'oblique', 'italic'] as const

export const AVAILABLE_FONT_WORDS = Object
  .keys(FONT_BASE_WEIGHTS)
  .concat(FONT_BASE_STYLES) as any as AvailableFontWords[]
