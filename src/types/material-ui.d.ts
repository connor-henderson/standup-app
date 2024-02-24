import styles from '@mui/material/styles';

type CoreColor = Record<'main' | 'focus', string>;

declare module '@mui/material/styles' {
  interface Theme {
    boxShadows: Record<string, any>;
    borders: Record<string, any>;
  }

  interface ThemeOptions {
    boxShadows: Record<string, any>;
    borders: Record<string, any>;
  }

  interface Palette {
    gradients: Record<string, Record<string, string>>;
    white: CoreColor;
    transparent: CoreColor; 
    dark: CoreColor;
    mode: 'light' | 'dark';
  }

  interface PaletteOptions {
    gradients: Record<string, Record<string, string>>;
    white: CoreColor;
    transparent: CoreColor; 
    dark: CoreColor;
    mode: 'light' | 'dark';
  }

  interface Typography {
    size: Record<string, string>;
  }

  interface TypographyOptions {
    size: Record<string, string>;
  }
}
