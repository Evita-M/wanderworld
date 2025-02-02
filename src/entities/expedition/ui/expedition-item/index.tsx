import { countries as countrieList } from '@/lib/data/countries';
import { Stack, Typography, useTheme } from '@mui/material';
import { format } from 'date-fns';
import { FC } from 'react';
import Link from 'next/link';
import { routes } from '@/routes/index';
import { getNames } from '@/utils/get-names';
import { grey } from '@mui/material/colors';
import { Expedition } from '../../model';

interface ExpeditionItemProps {
  expedition: Expedition;
}

export const ExpeditionItem: FC<ExpeditionItemProps> = ({ expedition }) => {
  const theme = useTheme();
  const { id, name, countries, startDate, endDate } = expedition;
  const countriesNames = getNames(countries, countrieList);

  return (
    <Link href={`${routes.expeditions}/${id}`}>
      <Stack
        justifyContent='center'
        alignItems='center'
        height={{ xs: '20rem', sm: '25rem', md: '30rem' }}
        width='100%'
        borderRadius={theme.borderRadius.medium}
        p={2}
        gap={1}
        border={`1px solid ${grey[300]}`}
        textAlign='center'
        sx={{
          transition: 'transform 0.3s',
          '&:hover': { transform: 'scale(1.02)', borderColor: 'primary.light' },
        }}
      >
        <Typography variant='h4' component='h3'>{name}</Typography>
        <Typography
          variant='h6'
          component='p'
          fontWeight={500}
          color={theme.palette.tertiary.main}
          textTransform='uppercase'
        >
          {countriesNames}
        </Typography>
        <Typography fontWeight={500} color={theme.palette.tertiary.main}>
          {format(startDate, 'dd/MM/yyyy')} – {format(endDate, 'dd/MM/yyyy')}
        </Typography>
      </Stack>
    </Link>
  );
};
