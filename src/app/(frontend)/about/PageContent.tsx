'use client';
import { ResponsiveImage } from '@/components/core/ResponsiveImage';
import { PageHeader } from '@/modules/page-header';
import {
  Stack,
  Typography,
  Container,
  Box,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';

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

const features = [
  {
    title: 'Curated Expeditions',
    description:
      'Hand-picked adventures that promise unforgettable experiences',
  },
  {
    title: 'Expert Guides',
    description: 'Local experts who bring destinations to life',
    icon: '/icons/guide.svg',
  },
  {
    title: 'Small Groups',
    description: 'Intimate groups for authentic travel experiences',
    icon: '/icons/group.svg',
  },
  {
    title: 'Sustainable Travel',
    description: 'Responsible tourism that respects local communities',
    icon: '/icons/eco.svg',
  },
];

const PageContent = () => {
  const theme = useTheme();
  const customColors = Object.values(theme.palette.custom);

  return (
    <Stack>
      <Container maxWidth='lg'>
        <PageHeader title='About Us' sx={{ mb: '4.0rem' }} />
        <Stack spacing={8}>
          <Grid container spacing={4} alignItems='center'>
            <Grid item xs={12} md={6}>
              <Typography variant='h4' gutterBottom>
                Our Mission
              </Typography>
              <Typography variant='body1' paragraph>
                We believe that the most meaningful adventures are those that
                challenge us, inspire us, and connect us with both nature and
                fellow explorers. Our platform brings together experienced
                guides and adventure seekers to create expeditions that go
                beyond typical tourism.
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
            <Typography variant='h4' gutterBottom mb={4}>
              What Sets Us Apart
            </Typography>
            <Grid container spacing={3}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} key={feature.title}>
                  <Box
                    p='2rem'
                    border={`1px solid ${customColors[index].main}`}
                    boxShadow={`0 4px ${customColors[index].main}`}
                    height='100%'
                    borderRadius={theme.borderRadius.large}
                  >
                    <Stack direction='row' spacing={2} alignItems='center'>
                      <Stack>
                        <Typography variant='h5' gutterBottom>
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
            <Typography variant='h4' gutterBottom>
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
                <Typography variant='body1' sx={{ fontStyle: 'italic' }}>
                  Let's embark on your next adventure together.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box borderRadius={theme.borderRadius.large} overflow='hidden'>
                  <ResponsiveImage
                    img={images.community}
                    aspectRatio={
                      images.community.height / images.community.width
                    }
                    borderRadius={theme.borderRadius.large}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Container>
    </Stack>
  );
};

export default PageContent;
