import React, { FC } from 'react';
import { lighten, Stack, Typography, useTheme } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

const ICON_SIZE = '2rem';

interface ContactProps {
  email?: string;
  phoneNumber?: string;
  variant?: 'row' | 'column';
}

export const Contact: FC<ContactProps> = ({
  email,
  phoneNumber,
  variant = 'row',
}) => {
  const theme = useTheme();
  const contactItems = [
    {
      icon: (
        <MailOutlineIcon
          sx={{ color: theme.palette.primary.main, fontSize: ICON_SIZE }}
          aria-label='Email'
        />
      ),
      text: email,
      link: `mailto:${email}`,
    },
    {
      icon: (
        <PhoneAndroidIcon
          sx={{ color: theme.palette.primary.main, fontSize: ICON_SIZE }}
          aria-label='Phone Number'
        />
      ),
      text: phoneNumber,
      link: `tel:${phoneNumber}`,
    },
  ];

  return (
    <Stack direction={variant} gap={2} rowGap={0} flexWrap='wrap'>
      {contactItems
        .filter((item) => item.text)
        .map((item, index) => (
          <Stack direction='row' alignItems='center' gap={1} mt={2} key={index}>
            <Stack
              justifyContent='center'
              alignItems='center'
              height='3.4rem'
              width='3.4rem'
              borderRadius='50%'
              bgcolor={lighten(theme.palette.primary.main, 0.85)}
            >
              {item.icon}
            </Stack>
            <Typography
              component='a'
              href={item.link}
              whiteSpace='nowrap'
              color='inherit'
              style={{ textDecoration: 'none' }}
            >
              {item.text}
            </Typography>
          </Stack>
        ))}
    </Stack>
  );
};
