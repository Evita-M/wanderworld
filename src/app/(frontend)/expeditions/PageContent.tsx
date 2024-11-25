import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { routes } from '@/routes/index';

const PageContent = async () => {
  return (
    <>
      <Stack
        justifyContent='space-between'
        direction='row'
        alignItems='center'
        mb={6}
      >
        <Typography variant='h1'>Expeditions</Typography>
        <Link href={routes.newExpedition}>
          <Button
            size='large'
            variant='contained'
            color='success'
            startIcon={<AddIcon />}
          >
            Add new expedition
          </Button>
        </Link>
      </Stack>
    </>
  );
};

export default PageContent;
