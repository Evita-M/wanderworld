import { Box, SxProps } from '@mui/material';

export const RoundedContainer = ({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: SxProps;
}) => {
  return (
    <Box bgcolor='white' borderRadius='1.6rem' p='2.4rem' sx={{ ...sx }}>
      {children}
    </Box>
  );
};
