import { FC, ReactNode } from 'react';
import { Stack, Typography, useTheme } from '@mui/material';

export interface ContactItemProps {
  icon: ReactNode;
  text: string | undefined;
  link: string;
}

export const ContactItem: FC<ContactItemProps> = ({ icon, text, link }) => {
  const theme = useTheme();

  return (
    <Stack direction='row' gap='1.2rem' alignItems='center'>
      <Stack
        justifyContent='center'
        alignItems='center'
        height='3.4rem'
        width='3.4rem'
        borderRadius='3.4rem'
        color='#ffffff'
        bgcolor={theme.palette.primary.light}
        border={`2px solid rgba(255, 255, 255, 0.1)`}
        sx={{
          outline: `2px solid ${theme.palette.primary.light}`,
          '& svg': { color: '#ffffff' },
        }}
      >
        {icon}
      </Stack>
      <Typography
        component='a'
        href={link}
        whiteSpace='nowrap'
        sx={{
          textDecoration: 'none',
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
};
