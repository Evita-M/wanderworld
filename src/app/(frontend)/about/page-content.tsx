'use client';

import { features } from '@/lib/data/features';
import { ResponsiveImage } from '@/shared/ui/core/layout';
import { PageHeader } from '@/shared/ui/core/typography';
import { Stack, Typography, Box, Grid, useTheme } from '@mui/material';
import { darken } from '@mui/material/styles';

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
              Our Mission
            </Typography>
            <Typography variant='body1' paragraph>
              At WanderWorld, we believe that the most meaningful adventures are
              those that challenge us, inspire us, and connect us with the world
              in ways we never imagined. For us, adventure is not just about
              reaching a destination—it’s about the journey, the people we meet
              along the way, and the transformative experiences that stay with
              us long after we return home.
            </Typography>
            <Typography variant='body1' paragraph>
              Our mission is to empower adventurers of all backgrounds to step
              outside their comfort zones and discover the extraordinary. We’re
              passionate about creating opportunities for exploration that not
              only immerse travelers in the beauty of nature but also foster a
              deeper connection with the environment and local communities.
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
          <Typography variant='h4' mb='3.2rem' mb={4}>
            What Sets Us Apart
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} key={feature.title}>
                <Box
                  p='2rem'
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
                  <Stack direction='row' spacing={2} alignItems='center'>
                    <Stack>
                      <Typography variant='h5' mb='1.8rem'>
                        {feature.title}
                      </Typography>
                      <Typography color='text.secondary'>
                        {feature.description}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box>
          <Typography variant='h4' mb='3.2rem'>
            Join Our Community
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant='body1' paragraph>
                Whether you're an experienced adventurer or taking your first
                steps into expedition travel, our community welcomes you. Join
                us in exploring the world's most remarkable destinations, from
                remote mountain peaks to hidden coastal gems.
              </Typography>
              <Typography variant='body1' paragraph>
                Join us as we venture into the extraordinary. From scaling
                majestic mountain peaks that touch the sky to discovering hidden
                coastal gems untouched by the modern world, we bring together
                like-minded explorers who share a passion for the great
                outdoors. Whether it’s trekking through lush rainforests,
                navigating winding river valleys, or experiencing the vibrant
                cultures of remote villages, our expeditions offer something for
                everyone.
              </Typography>
              <Typography variant='body1' sx={{ fontStyle: 'italic' }}>
                Let's embark on your next adventure together.
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
