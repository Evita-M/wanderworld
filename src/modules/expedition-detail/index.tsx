import { Box, Stack } from '@mui/material';
import { Expedition, Guide } from '@prisma/client';
import React, { FC } from 'react';
import { countries } from '@/lib/data/countries';
import { DateRange } from '@/components/core/DateRange';
import { getNames } from '@/utils/get-names';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import { IconText } from '@/components/core/IconText';
import { BasicMasonry } from '../masonry';
import { ExpeditionInfo } from '../expedition-info';
import { GuideInfo } from '../guide-info';
import { PageContainer } from '@/components/core/PageContainer';

interface ExpeditionDetailProps {
  expedition: Expedition;
  guide?: Guide;
}

export const ExpeditionDetail: FC<ExpeditionDetailProps> = ({
  expedition,
  guide,
}) => {
  const countryNames = getNames(expedition.countries, countries);

  return (
    <>
      <Stack flexDirection='row' mb='3.2rem' gap='4.4rem'>
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
      <Stack flexDirection='row' gap='2rem'>
        <Box flex='0 1 160rem'>
          <BasicMasonry />
        </Box>
        <Box flex='0 0 40rem' pb='1rem'>
          <GuideInfo guide={guide} />
        </Box>
      </Stack>
      <Stack maxWidth='120rem' p='1rem'>
        <ExpeditionInfo expedition={expedition} />
      </Stack>
    </>
  );
};
