import { createTheme } from '@mui/material/styles';
import { green, grey } from '@mui/material/colors';
import { PaddingRounded } from '@mui/icons-material';

export const bgColor = '#fff';

declare module '@mui/material/styles' {
  interface Palette {
    custom: Record<string, { bg: string; text: string }>;
  }
  interface PaletteOptions {
    custom?: Record<string, { bg: string; text: string }>;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    customBlue: true;
    customYellow: true;
    customGreen: true;
  }
}

const theme = createTheme({
  palette: {
    background: {
      default: bgColor,
    },
    primary: {
      main: '#27A562', // Green shade for primary color
      contrastText: '#FFFFFF', // White text for strong contrast
    },
    secondary: {
      main: '#FFD866', // Brighter yellow for emphasis
      contrastText: '#3C2E00', // Darker text for better readability
    },
    error: {
      main: '#B33951', // Stronger red for better contrast
      contrastText: '#FFFFFF', // Darker red text
    },
    warning: {
      main: '#F5A65B', // Stronger red for better contrast
      contrastText: '#FFFFFF', // Darker red text
    },
    custom: {
      blue: { bg: '#D0EEFF', text: '#3A5F5B' },
      yellow: { bg: '#FFEDAE', text: '#6C5208' },
      beige: { bg: '#E3E2D8', text: '#555451' },
      mint: { bg: '#D7ECDF', text: '#3D5A4F' },
      red: { bg: '#FFE5E5', text: '#A13453' },
      gray: { bg: '#E4E7E4', text: '#3B4859' },
      lavender: { bg: '#EAD7EC', text: '#582C5D' },
      peach: { bg: '#FFD890', text: '#754513' },
      green: { bg: '#D3E5C5', text: '#3A6E3A' },
    },
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
          padding: '0 12px 0 12px',
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
        },
      },
      variants: [
        {
          props: { color: 'customBlue' },
          style: {
            backgroundColor: '#D0EEFF',
            color: '#3A5F5B',
            '&:hover': {
              backgroundColor: '#B8D7EE',
            },
          },
        },
        {
          props: { color: 'customYellow' },
          style: {
            backgroundColor: '#FFEDAE',
            color: '#6C5208',
            '&:hover': {
              backgroundColor: '#FFE08C',
            },
          },
        },
        {
          props: { color: 'customGreen' },
          style: {
            backgroundColor: '#D3E5C5',
            color: '#3A6E3A',
            '&:hover': {
              backgroundColor: '#C4D7B3',
            },
          },
        },
      ],
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: green[500],
          color: '#fff',
          height: '34px',
          '&:hover': {
            backgroundColor: green[600],
          },
          '&.MuiChip-deletable:hover': {
            backgroundColor: green[600],
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
            borderColor: green[600],
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: green[400],
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: grey[700],
          '&.Mui-focused': {
            color: green[600],
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        thumb: {
          color: green[600],
          height: '24px',
          width: '24px',
          '&:hover': {
            color: green[700],
          },
        },
        track: {
          color: green[300],
          height: '12px',
        },
        rail: {
          color: grey[600],
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
          color: green[400],
          '&.Mui-checked': {
            color: green[600],
          },
          '&:hover': {
            color: green[700],
          },
          '&.Mui-checked:hover': {
            backgroundColor: green[50],
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
            color: green[600],
          },
          '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: green[300],
            opacity: 1,
          },
        },
        thumb: {
          color: green[600],
          '&:hover': {
            color: green[700],
          },
        },
        track: {
          backgroundColor: grey[600],
          height: '12px',

          '&.Mui-checked': {
            backgroundColor: green[400],
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
          borderColor: green[300],
          '&.Mui-selected': {
            backgroundColor: green[500],
            color: '#fff',
            '&:hover': {
              backgroundColor: green[600],
            },
          },
          '&:hover': {
            backgroundColor: green[50],
          },
        },
      },
    },
  },
});

export default theme;
