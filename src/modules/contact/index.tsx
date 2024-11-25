import React, { FC } from 'react';
import { Stack, Typography } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { green } from '@mui/material/colors';

const ICON_COLOR = '#0C7C59';
const ICON_BG_COLOR = green[50];

interface ContactProps {
  email?: string;
  phoneNumber?: string;
}

export const Contact: FC<ContactProps> = ({ email, phoneNumber }) => {
  const contactItems = [
    {
      icon: <MailOutlineIcon sx={{ color: ICON_COLOR }} aria-label='Email' />,
      text: email,
      link: `mailto:${email}`,
    },
    {
      icon: (
        <PhoneAndroidIcon
          sx={{ color: ICON_COLOR }}
          aria-label='Phone Number'
        />
      ),
      text: phoneNumber,
      link: `tel:${phoneNumber}`,
    },
  ];

  return (
    <Stack direction='row' gap={2} rowGap={0} flexWrap='wrap'>
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
              bgcolor={ICON_BG_COLOR}
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
