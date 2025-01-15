'use client';

import { useParams, useRouter } from 'next/navigation';
import { Loader } from '@/ui/core/loader';
import { Box, Stack, Typography } from '@mui/material';
import { routes } from '@/routes/index';
import { useGetGuideQuery } from '@/redux/api/guideApi';
import { borderRadius } from '@/styles/border-radius';
import { grey } from '@mui/material/colors';
import { GuideForm } from '@/modules/forms/guide';

const PageContent = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: guide, isLoading: isGuideLoading } = useGetGuideQuery(
    id as string
  );

  const redirectToGuides = (guideId: string) => {
    router.replace(`${routes.guides}/${guideId}`);
  };

  return (
    <Stack
      height='100%'
      p='3.2rem'
      borderRadius={borderRadius.large}
      border={`1px solid ${grey[300]}`}
    >
      <Typography variant='h3' component='h2' mb='4rem'>
        Edit Guide
      </Typography>
      {isGuideLoading ? (
        <Box
          display='flex'
          justifyContent='center'
          height='100%'
          flex='1 1 100%'
        >
          <Loader />
        </Box>
      ) : (
        <GuideForm
          guide={guide}
          isEdit={true}
          onCancel={() => redirectToGuides(id as string)}
          onSuccess={() => redirectToGuides(id as string)}
        />
      )}
    </Stack>
  );
};

export default PageContent;
