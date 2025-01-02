import { Stack, Typography } from '@mui/material';

export default function Guide() {
  return (
    <Stack
      flex={1}
      alignItems='center'
      justifyContent='center'
      sx={{ bgcolor: 'background.paper' }}
    >
      <Typography color='text.secondary'>
        Select a guide to view details
      </Typography>
    </Stack>
  );
}
