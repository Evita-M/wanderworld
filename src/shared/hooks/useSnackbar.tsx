import { SnackbarContext } from '@/providers/SnackProvider';
import { useContext } from 'react';

const useSnackbar = () => {
  if (!SnackbarContext)
    throw new Error('useSnackbar must be used within a SnackbarProvider');

  return useContext(SnackbarContext);
};

export { useSnackbar };
