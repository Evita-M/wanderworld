import { Box, Typography } from '@mui/material';

interface IconWithTextProps {
  icon: React.ReactNode;
  text: string;
}

export const IconText: React.FC<IconWithTextProps> = ({ icon, text }) => {
  return (
    <Box display='flex' alignItems='center' gap='1.2rem'>
      {icon}
      <Typography>{text}</Typography>
    </Box>
  );
};
