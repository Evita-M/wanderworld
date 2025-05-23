import { Box, SxProps, useTheme } from '@mui/material';

export const RoundedContainer = ({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: SxProps;
}) => {
  const theme = useTheme();
  return (
    <Box
      bgcolor={theme.palette.background.paper}
      borderRadius='2.4rem'
      p='3.2rem'
      sx={sx || {}}
    >
      {children}
    </Box>
  );
};
