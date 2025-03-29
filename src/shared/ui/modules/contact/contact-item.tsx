import { FC, ReactNode } from 'react';
import { lighten, Stack, Typography, useTheme } from '@mui/material';

export interface ContactItemProps {
  icon: ReactNode;
  text: string | undefined;
  link: string;
}

export const ContactItem: FC<ContactItemProps> = ({ icon, text, link }) => {
  const theme = useTheme();

  return (
    <Stack direction='row' gap="1.2rem" alignItems='center'>
      <Stack
        justifyContent='center'
        alignItems='center'
        height='3.4rem'
        width='3.4rem'
        borderRadius='0.6rem'
        bgcolor={lighten(theme.palette.primary.main, 0.9)}
      >
        {icon}
      </Stack>
      <Typography
        component='a'
        href={link}
        whiteSpace='nowrap'
        color='inherit'
        style={{ textDecoration: 'none' }}
      >
        {text}
      </Typography>
    </Stack>
  );
};
