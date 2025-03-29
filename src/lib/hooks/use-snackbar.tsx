import { SnackbarContext } from '@/providers/snack-provider';
import { useContext } from 'react';

const useSnackbar = () => {
  if (!SnackbarContext)
    throw new Error('useSnackbar must be used within a SnackbarProvider');

  return useContext(SnackbarContext);
};

export { useSnackbar };
