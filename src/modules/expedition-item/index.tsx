import { countries as countrieList } from '@/lib/data/countries';
import { Stack, Typography, useTheme } from '@mui/material';
import { Expedition } from '@prisma/client';
import { format } from 'date-fns';
import React, { FC, useMemo } from 'react';
import Link from 'next/link';
import { routes } from '@/routes/index';
import { getNames } from '@/utils/get-names';

interface ExpeditionItemProps {
  expedition: Expedition;
}

export const ExpeditionItem: FC<ExpeditionItemProps> = ({ expedition }) => {
  const theme = useTheme();
  const { id, name, countries, startDate, endDate } = expedition;
  const countriesNames = getNames(countries, countrieList);

  // Memoize a random color from theme.palette.custom
  const randomColor = useMemo(() => {
    const customColors = theme.palette.custom;
    const keys = Object.keys(customColors) as Array<keyof typeof customColors>;
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return customColors[randomKey];
  }, [theme]);

  return (
    <Link href={`${routes.expeditions}/${id}`}>
      <Stack
        justifyContent='center'
        alignItems='center'
        height='40rem'
        width='40rem'
        borderRadius='40rem'
        p={2}
        gap={1}
        textAlign='center'
        sx={{
          backgroundColor: randomColor.bg,
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
          color={randomColor.text}
          textTransform='uppercase'
        >
          {countriesNames}
        </Typography>
        <Typography fontWeight={500}>
          {format(startDate, 'dd/MM/yyyy')} – {format(endDate, 'dd/MM/yyyy')}
        </Typography>
      </Stack>
    </Link>
  );
};
