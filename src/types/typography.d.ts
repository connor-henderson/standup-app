import createTypography from '@mui/material/styles/createTypography';

declare module '@mui/material/styles/createTypography' {
  interface Typography {
    size: Record<string, string>;
  }

  interface TypographyOptions {
    size: Record<string, string>;
  }
}
