'use client';

import { Box, Stack } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import { FC } from 'react';
import { Expedition } from '../../model';
import { Guide } from '@/entities/guide/model';
import { getNames } from '@/utils/get-names';
import { countries } from '@/lib/data/countries';
import { DateRange } from '@/shared/ui/components/date-range';
import { IconText } from '@/shared/ui/core/typography';
import { GuideInfo } from '@/entities/guide/ui/guide-info';
import { ExpeditionInfo } from '../expedition-info';
import { MasonryGrid } from '@/shared/ui/modules/masonry-grid';


interface ExpeditionViewProps {
  expedition: Expedition;
  guide?: Guide;
}

export const ExpeditionView: FC<ExpeditionViewProps> = ({
  expedition,
  guide,
}) => {
  const countryNames = getNames(expedition.countries, countries);

  return (
    <>
      <Stack spacing='2.4rem'>
        <Stack flexDirection='row' spacing='4.4rem'>
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
        <Stack flexDirection='row' spacing='2rem'>
          <Box flex='0 1 160rem'>
            <MasonryGrid />
          </Box>
          <Box flex='0 0 40rem' pb='1rem'>
            <GuideInfo guide={guide} />
          </Box>
        </Stack>
        <Stack maxWidth='120rem' p='1rem'>
          <ExpeditionInfo expedition={expedition} />
        </Stack>
      </Stack>
    </>
  );
};
