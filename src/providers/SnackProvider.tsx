import { Alert, AlertColor, Snackbar } from '@mui/material';
import { createContext, FC, ReactNode, useState } from 'react';

type SnackbarContextActions = {
  showSnackBar: (text: string, severity: AlertColor) => void;
};

const SnackbarContext = createContext({} as SnackbarContextActions);

interface SnackBarContextProviderProps {
  children: ReactNode;
}

const SnackbarProvider: FC<SnackBarContextProviderProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [severity, setSeverity] = useState<AlertColor>('warning');

  const showSnackBar = (text: string, severity: AlertColor) => {
    setMessage(text);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackBar }}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} variant='filled'>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
};

export { SnackbarProvider, SnackbarContext };
