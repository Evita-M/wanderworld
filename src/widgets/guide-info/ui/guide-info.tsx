import { Avatar } from '@/shared/ui/core/avatar/avatar';
import theme from '@/styles/theme';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { Stats } from './stats';
import { Contact } from '@/shared/ui/modules/contact/contact';

interface GuideInfoProps {
  name: string;
  email: string;
  phoneNumber: string;
  avatar?: string;
  languagesCount: number;
  expeditionsCount: number;
  onClick?: VoidFunction;
}

export const GuideInfo: FC<GuideInfoProps> = ({
  name,
  email,
  phoneNumber,
  avatar,
  languagesCount = 0,
  expeditionsCount = 0,
  onClick,
}) => (
  <Stack
    component='article'
    alignItems='center'
    textAlign='center'
    position='relative'
  >
    <Chip
      label='Pro'
      size='small'
      sx={{
        position: 'absolute',
        textTransform: 'uppercase',
        top: '2.4rem',
        right: '2.4rem',
        backgroundColor: 'rgb(255, 215, 0)',
      }}
    />
    <Stack
      p='2.4rem 2.4rem 1.2rem'
      width='100%'
      alignItems='center'
      justifyContent='center'
    >
      <Avatar src={avatar} alt={name} size={140} />
    </Stack>
    <Stack
      direction='column'
      gap='1.6rem'
      width='100%'
      p='1.2rem 2.4rem 2.4rem'
      borderBottom={`2px solid ${theme.palette.tertiary.main}`}
    >
      <Box>
        <Typography variant='h4' component='p' mb='0.8rem'>
          {name}
        </Typography>
        <Typography variant='caption' color='text.secondary'>
          WanderWorld Guide
        </Typography>
      </Box>
      <Contact
        email={email}
        phoneNumber={phoneNumber}
        sx={{ justifyContent: 'center', mb: '1.6rem' }}
      />
      <Box>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => onClick?.()}
        >
          View Profile
        </Button>
      </Box>
    </Stack>
    <Stats
      data={[
        { label: 'Languages', count: languagesCount },
        { label: 'Expeditions', count: expeditionsCount },
      ]}
    />
  </Stack>
);
