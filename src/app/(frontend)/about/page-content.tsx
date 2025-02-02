'use client';

import { aboutContent } from '@/lib/data/about';
import { features } from '@/lib/data/features';
import { ResponsiveImage } from '@/shared/ui/core/layout';
import { PageHeader } from '@/shared/ui/core/typography';
import { Stack, Typography, Box, Grid, useTheme } from '@mui/material';
import { darken } from '@mui/material/styles';
import MapIcon from '@mui/icons-material/Map';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import NatureIcon from '@mui/icons-material/Nature';
import { createElement } from 'react';

type IconName = keyof typeof iconComponents;

const iconComponents = {
  MapIcon: MapIcon,
  PersonIcon: PersonIcon,
  GroupsIcon: GroupsIcon,
  NatureIcon: NatureIcon,
};

const images = {
  mission: {
    src: '/hero_3.jpg',
    width: 1920,
    height: 1080,
    alt: 'Explorers planning their route',
  },
  community: {
    src: '/community.jpg',
    width: 1920,
    height: 1080,
    alt: 'Group of travelers',
  },
};

const PageContent = () => {
  const theme = useTheme();
  const customColors = Object.values(theme.palette.custom);

  return (
    <>
      <PageHeader title='About Us' sx={{ mb: '4.0rem' }} />
      <Stack spacing={8}>
        <Grid container spacing={4} alignItems='center'>
          <Grid item xs={12} md={6}>
            <Typography variant='h4' mb='3.2rem'>
              {aboutContent.mission.title}
            </Typography>
            <Typography paragraph>
              {aboutContent.mission.paragraphs[0]}
            </Typography>
            <Typography paragraph>
              {aboutContent.mission.paragraphs[1]}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box borderRadius={theme.borderRadius.large} overflow='hidden'>
              <ResponsiveImage
                img={images.mission}
                aspectRatio={images.mission.height / images.mission.width}
                borderRadius={theme.borderRadius.large}
              />
            </Box>
          </Grid>
        </Grid>

        <Box>
          <Typography variant='h4' mb='3.2rem'>
            {aboutContent.whatSetsUsApart.title}
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} key={feature.title}>
                <Box
                  p='3.6rem'
                  sx={{
                    border: `2px solid ${customColors[index].main}`,
                    boxShadow: `0 4px ${customColors[index].main}`,
                    height: '100%',
                    borderRadius: theme.borderRadius.large,
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      boxShadow: `0 4px ${darken(customColors[index].main, 0.1)}`,
                      borderColor: darken(customColors[index].main, 0.1),
                    },
                  }}
                >
                  <Stack direction='row' spacing={4} alignItems='center'>
                    <Stack>
                      <Typography variant='h5' mb='1.8rem'>
                        {feature.title}
                      </Typography>
                      <Typography color='text.secondary'>
                        {feature.description}
                      </Typography>
                    </Stack>
                    <Box
                      sx={{
                        color: customColors[index].main,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {createElement(iconComponents[feature.icon as IconName], { sx: { fontSize: '8rem' } })}
                    </Box>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box>
          <Typography variant='h4' mb='3.2rem'>
            {aboutContent.community.title}
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography paragraph>
                {aboutContent.community.paragraphs[0]}
              </Typography>
              <Typography paragraph>
                {aboutContent.community.paragraphs[1]}
              </Typography>
              <Typography color='text.secondary' fontStyle="italic">
                {aboutContent.community.closing}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box borderRadius={theme.borderRadius.large} overflow='hidden'>
                <ResponsiveImage
                  img={images.community}
                  aspectRatio={images.community.height / images.community.width}
                  borderRadius={theme.borderRadius.large}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </>
  );
};

export default PageContent;
