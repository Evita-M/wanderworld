import { FC } from 'react';
import { format } from 'date-fns';
import { Typography, List, ListItem, Stack } from '@mui/material';
import { Language } from '@/shared/types/language';
import { TourDetailsItem } from './tour-details-Item';
import { LanguagesList } from '@/shared/ui/modules/languages/languages-list';

interface TourDetailsProps {
  languages: Language[];
  meetingDate: Date;
  activities: string[];
}

export const TourDetails: FC<TourDetailsProps> = ({
  languages,
  meetingDate,
  activities,
}) => {
  return (
    <Stack direction='column' gap='1.6rem'>
      <TourDetailsItem title='Languages of the tour'>
        <LanguagesList languages={languages} />
      </TourDetailsItem>
      <TourDetailsItem title='Organization meeting'>
        <Typography>
          {format(meetingDate, 'EEEE, d MMMM yyyy HH:mm')} in WanderWorld Cafe
        </Typography>
      </TourDetailsItem>
    </Stack>
  );
};
