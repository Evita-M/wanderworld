import { countries as countrieList } from '@/lib/data/countries';
import { Stack, Typography, useTheme } from '@mui/material';
import { Expedition } from '@prisma/client';
import { format } from 'date-fns';
import React, { FC, useMemo } from 'react';
import Link from 'next/link';
import { routes } from '@/routes/index';
import { getNames } from '@/utils/get-names';
import { grey } from '@mui/material/colors';

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
        height='30rem'
        width='40rem'
        borderRadius='2rem'
        p={2}
        gap={1}
        border={`1px solid ${grey[300]}`}
        textAlign='center'
        sx={{
          transition: 'transform 0.3s',
          '&:hover': { transform: 'scale(1.05)' },
        }}
      >
        <Typography variant='h4' className='text-lg font-bold'>
          {name}
        </Typography>
        <Typography
          variant='h6'
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
