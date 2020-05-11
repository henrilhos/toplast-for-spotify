export type Colors =
  | 'primary'
  | 'light'
  | 'dark'
  | 'black'
  | 'grey'
  | 'green'
  | 'white'
  | 'white-light'
  | 'white-lighter'
  | 'error'
export type FontSizes =
  | 'display-1'
  | 'display-2'
  | 'display-3'
  | 'display-4'
  | 'headline'
  | 'title'
  | 'subtitle-1'
  | 'subtitle-2'
  | 'body-1'
  | 'body-2'
  | 'button'
  | 'caption'
  | 'overline'

const FONT_SIZE_BASE = 16
const pxToRem = (px: number): string => `${px / FONT_SIZE_BASE}rem`

const theme = {
  settings: {
    fontSizeBase: FONT_SIZE_BASE,
    fontFamilyBase: 'Montserrat',
  },
  colors: {
    primary: '#D51007',
    light: '#FAFAFA',
    dark: '#101010',
    black: '#000000',
    grey: '#262525',
    green: '#1db954',
    white: '#FFFFFF',
    'white-light': '#ffffff70',
    'white-lighter': '#ffffff15',
    error: '#B71C1C',
  },
  fontSizes: {
    'display-1': pxToRem(96),
    'display-2': pxToRem(60),
    'display-3': pxToRem(48),
    'display-4': pxToRem(34),
    headline: pxToRem(24),
    title: pxToRem(20),
    'body-1': pxToRem(16),
    'body-2': pxToRem(14),
    caption: pxToRem(12),
    overline: pxToRem(10),
  },
}

export type Theme = typeof theme

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

export { theme, FONT_SIZE_BASE }
