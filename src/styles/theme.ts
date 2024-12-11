import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, grey } from '@mui/material/colors';

export const bgColor = '#fff';

// Primary color palette
const primary = {
  main: '#219ebc',
  light: '#8ecae6',
  lighter: '#e6f4f8',
  dark: '#1a7b94',
};

declare module '@mui/material/styles' {
  interface Palette {
    custom: Record<string, { main: string; text: string }>;
    tertiary: Palette['primary'];
  }
  interface PaletteOptions {
    custom?: Record<string, { main: string; text: string }>;
    tertiary?: PaletteOptions['primary'];
  }
}

const customColors = {
  blue: { main: '#d1f0ff', text: '#3A5F5B' },
  yellow: { main: '#FFEDAE', text: '#6C5208' },
  beige: { main: '#E3E2D8', text: '#555451' },
  mint: { main: '#D7ECDF', text: '#3D5A4F' },
  red: { main: '#FFE5E5', text: '#A13453' },
  gray: { main: '#E4E7E4', text: '#3B4859' },
  lavender: { main: '#EAD7EC', text: '#582C5D' },
  peach: { main: '#FFD890', text: '#754513' },
  green: { main: '#D3E5C5', text: '#3A6E3A' },
};

const theme = createTheme({
  palette: {
    background: {
      default: bgColor,
    },
    primary: {
      main: primary.main,
      light: primary.light,
      dark: primary.dark,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#fb8500', // Orange
      contrastText: '#FFFFFF',
    },
    tertiary: {
      main: '#023047', // Dark Blue
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#ffb703', // Yellow
      contrastText: '#000000',
    },
    info: {
      main: '#d4ebf2', // Light Blue
      contrastText: '#000000',
    },
    error: {
      main: '#C70039', // Stronger red for better contrast
      contrastText: '#FFFFFF', // Darker red text
    },
    custom: customColors,
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: `var(--noto-sans), sans-serif`,
    allVariants: {
      color: grey[900],
      letterSpacing: '0.025em',
    },
    h1: {
      fontFamily: `var(--museo-moderno), cursive`,
      fontSize: '7.6rem',
    },
    h2: {
      fontFamily: `var(--museo-moderno), cursive`,
      fontSize: '6rem',
    },
    h3: {
      fontFamily: `var(--museo-moderno), cursive`,
      fontSize: '4.8rem',
    },
    h4: {
      fontFamily: `var(--museo-moderno), cursive`,
      fontSize: '3.6rem',
    },
    h5: {
      fontFamily: `var(--museo-moderno), cursive`,
      fontSize: '2.8rem',
    },
    h6: {
      fontFamily: `var(--museo-moderno), cursive`,
      fontSize: '2.2rem',
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          padding: '4px',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: 'none', // Remove the default underline
          paddingBottom: 0, // Remove extra space under the tabs
        },
        indicator: {
          display: 'none',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: `var(--museo-moderno), cursive`,
          fontSize: '1.8rem',
          textTransform: 'none',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)', // Vertical separator between items
          borderBottom: 'none',
          padding: '0 2.4rem',
          minHeight: '4rem',
          '&:last-child': {
            borderRight: 'none',
            paddingRight: '0',
          },
          '&:first-child': {
            paddingLeft: '0',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
          lineHeight: 1.5,
        },
        sizeSmall: {
          padding: '0.6rem 1.6rem',
          fontSize: '1.4rem',
          height: '3.2rem',
          minWidth: '8rem',
        },
        sizeMedium: {
          padding: '0.8rem 2.4rem',
          fontSize: '1.6rem',
          height: '4rem',
          minWidth: '10rem',
        },
        sizeLarge: {
          padding: '1.2rem 3.2rem',
          fontSize: '1.8rem',
          height: '4.8rem',
          minWidth: '12rem',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: primary.main,
          color: '#fff',
          height: '34px',
          '&:hover': {
            backgroundColor: primary.dark,
          },
          '&.MuiChip-deletable:hover': {
            backgroundColor: primary.dark,
          },
        },
        label: {
          fontWeight: 500,
        },
        deleteIcon: {
          color: '#fff',
          '&:hover': {
            color: '#fff',
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#0C7C59',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          minWidth: '20rem',
          '&:hover': {
            backgroundColor: bgColor,
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: '1.2rem',
          boxShadow: 'none',
          border: `1px solid ${grey[300]}`,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '0.5rem 0',
          backgroundColor: grey[300],
          opacity: 0.5,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: primary.main,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: primary.light,
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: grey[700],
          fontWeight: 500,
          '&.Mui-focused': {
            color: '#023047',
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        thumb: {
          color: primary.main,
          height: '24px',
          width: '24px',
          '&:hover': {
            color: primary.dark,
          },
        },
        track: {
          color: primary.light,
          height: '12px',
        },
        rail: {
          color: grey[300],
          height: '12px',
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: green[500],
          '&.Mui-checked': {
            color: green[600],
          },
          '&:hover': {
            backgroundColor: green[100],
          },
          '&.Mui-checked:hover': {
            color: green[700],
          },
        },
      },
    },
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          backgroundColor: '#fff',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: primary.light,
          '&.Mui-checked': {
            color: primary.main,
          },
          '&:hover': {
            color: primary.dark,
            backgroundColor: 'transparent',
          },
          '&.Mui-checked:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: '64px',
        },
        switchBase: {
          '&.Mui-checked': {
            transform: 'translateX(28px)',
            color: primary.main,
          },
          '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: primary.light,
            opacity: 1,
          },
        },
        thumb: {
          color: primary.main,
          '&:hover': {
            color: primary.dark,
          },
        },
        track: {
          backgroundColor: grey[600],
          height: '12px',
          '&.Mui-checked': {
            backgroundColor: primary.light,
            opacity: 1,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiFormHelperText-root.Mui-error': {
            position: 'absolute',
            top: '100%',
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          borderColor: primary.light,
          '&.Mui-selected': {
            backgroundColor: primary.main,
            color: '#fff',
            '&:hover': {
              backgroundColor: primary.dark,
            },
          },
          '&:hover': {
            backgroundColor: primary.lighter,
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: '4px 0',
          display: 'flex',
          alignItems: 'center',
          '&.with-bullet::before': {
            content: '""',
            display: 'block',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            marginRight: '12px',
          },
          '&.bullet-blue::before': {
            backgroundColor: customColors.blue.main,
          },
          '&.bullet-yellow::before': {
            backgroundColor: customColors.yellow.main,
          },
          '&.bullet-beige::before': {
            backgroundColor: customColors.beige.main,
          },
          '&.bullet-mint::before': {
            backgroundColor: customColors.mint.main,
          },
          '&.bullet-red::before': {
            backgroundColor: customColors.red.main,
          },
          '&.bullet-gray::before': {
            backgroundColor: customColors.gray.main,
          },
          '&.bullet-lavender::before': {
            backgroundColor: customColors.lavender.main,
          },
          '&.bullet-peach::before': {
            backgroundColor: customColors.peach.main,
          },
          '&.bullet-green::before': {
            backgroundColor: customColors.green.main,
          },
        },
      },
    },
    MuiTextarea: {
      styleOverrides: {
        root: {
          padding: '1.2rem',
          fontSize: '1.6rem',
          fontFamily: `var(--noto-sans), sans-serif`,
          borderRadius: '0.8rem',
          border: `1px solid ${grey[300]}`,
          resize: 'vertical',
          minHeight: '12rem',
          width: '100%',
          backgroundColor: '#fff',
          '&:hover': {
            borderColor: primary.light,
          },
          '&:focus': {
            outline: 'none',
            borderColor: primary.main,
            boxShadow: `0 0 0 2px ${primary.lighter}`,
          },
          '&::placeholder': {
            color: grey[500],
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          marginRight: 0,
          '&:hover .MuiCheckbox-root': {
            color: primary.dark,
            transition: 'color 0.3s ease',
          },
        },
        label: {
          fontSize: '1.6rem',
        },
      },
    },
  },
});

export default theme;
