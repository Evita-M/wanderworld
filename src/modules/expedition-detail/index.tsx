import { Box, Stack } from '@mui/material';
import { FC } from 'react';
import { countries } from '@/lib/data/countries';
import { DateRange } from '@/ui/components/date-range';
import { getNames } from '@/utils/get-names';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import { IconText } from '@/ui/core/typography';
import { BasicMasonry } from '../masonry';
import { ExpeditionInfo } from '../expedition-info';
import { GuideInfo } from '../guide-info';
import { Expedition } from '@/types/expedition';
import { Guide } from '@/types/guide';

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
    <Stack spacing={3}>
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
    </Stack>
  );
};
