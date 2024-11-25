import { createTheme } from '@mui/material/styles';
import { green, grey, brown, lightGreen } from '@mui/material/colors';
import { museoModerno, notoSans } from './fonts';

export const bgColor = '#F6F7F6';

const theme = createTheme({
  palette: {
    primary: { main: '#0C7C59' },
    background: {
      default: bgColor,
    },
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: notoSans.style.fontFamily,
    allVariants: {
      color: grey[900],
      letterSpacing: '0.025em',
    },
    h1: {
      fontFamily: museoModerno.style.fontFamily,
      fontSize: '7.6rem',
    },
    h2: {
      fontFamily: museoModerno.style.fontFamily,
      fontSize: '6rem',
    },
    h3: {
      fontFamily: museoModerno.style.fontFamily,
      fontSize: '4.8rem',
    },
    h4: {
      fontFamily: museoModerno.style.fontFamily,
      fontSize: '3.6rem',
    },
    h5: {
      fontFamily: museoModerno.style.fontFamily,
      fontSize: '2.8rem',
    },
    h6: {
      fontFamily: museoModerno.style.fontFamily,
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
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: green[500],
          color: '#fff',
          '&:hover': {
            backgroundColor: green[600],
          },
          '&.MuiChip-deletable:hover': {
            backgroundColor: green[600],
          },
        },
        label: {
          color: '#fff',
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
    MuiButton: {
      styleOverrides: {
        root: {
          '&.MuiButtonBase:disabled': {
            cursor: 'not-allowed',
            pointerEvents: 'auto',
          },
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
