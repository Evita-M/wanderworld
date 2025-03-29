import { FC } from 'react';
import { Stack, useTheme } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { ContactItem, ContactItemProps } from './contact-item';

const ICON_SIZE = '2rem';

export interface ContactProps {
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

  const contactItems: ContactItemProps[] = [
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
    <Stack
      direction={variant}
      gap={variant === 'row' ? '2.4rem' : '1.4rem'}
      flexWrap='wrap'
    >
      {contactItems
        .filter((item) => item.text)
        .map((item, index) => (
          <ContactItem key={index} {...item} />
        ))}
    </Stack>
  );
};
