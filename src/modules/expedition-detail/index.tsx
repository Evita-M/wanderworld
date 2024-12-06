import { Box, Stack } from '@mui/material';
import { Expedition } from '@prisma/client';
import React, { FC } from 'react';
import { countries } from '@/lib/data/countries';
import { DateRange } from '@/components/core/DateRange';
import { getNames } from '@/utils/get-names';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import { IconText } from '@/components/core/IconText';
import { BasicMasonry } from '../masonry';
import { ExpeditionInfo } from '../expedition-info';

interface ExpeditionDetailProps {
  expedition: Expedition;
}

export const ExpeditionDetail: FC<ExpeditionDetailProps> = ({ expedition }) => {
  const countryNames = getNames(expedition.countries, countries);

  return (
    <Stack gap='2.4rem'>
      <Stack flexDirection='row' gap='3.2rem'>
        <DateRange
          startDate={expedition.startDate}
          endDate={expedition.endDate}
        />
        <IconText
          icon={<LocationOnIcon color='primary' />}
          text={countryNames}
        />
        <IconText
          icon={<PeopleIcon color='primary' />}
          text={`${expedition.minGroupSize} - ${expedition.maxGroupSize} participants`}
        />
      </Stack>
      <BasicMasonry />
      <Box minHeight='30rem'>
        <ExpeditionInfo expedition={expedition} />
      </Box>
    </Stack>
  );
};
