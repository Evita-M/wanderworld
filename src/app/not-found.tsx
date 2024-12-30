import { PageContainer } from '@/components/core/PageContainer';
import { Box, Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';

export default async function NotFound() {
  return (
    <PageContainer>
      <Stack
        component='section'
        justifyContent='center'
        alignItems='center'
        textAlign='center'
        height='100%'
        spacing={3}
      >
        <Box>
          <Typography color='primary' fontWeight={600}>
            404
          </Typography>
          <Typography variant='h2' component='h2'>
            Page not found
          </Typography>
        </Box>
        <Typography>Sorry, we could not find requested page</Typography>
        <Button
          href='/'
          variant='contained'
          color='secondary'
          LinkComponent={Link}
        >
          Go back home
        </Button>
      </Stack>
    </PageContainer>
  );
}
