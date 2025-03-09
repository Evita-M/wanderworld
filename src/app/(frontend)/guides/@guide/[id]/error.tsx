'use client';
import { ErrorBoundary } from '@/shared/ui/modules/error-boundary';
import { borderRadius } from '@/styles/border-radius';
import { grey } from '@mui/material/colors';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <ErrorBoundary
      title={error.message}
      submessage='Try to reload the page'
      button={{
        label: 'Reload page',
        onClick: reset,
      }}
      sx={{
        borderRadius: borderRadius.large,
        border: `1px solid ${grey[300]}`,
      }}
    />
  );
}
