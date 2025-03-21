import { FC } from 'react';
import { format } from 'date-fns';
import { Typography, List, ListItem } from '@mui/material';
import { LanguagesList } from '@/shared/ui/modules/languages/LanguagesList';
import { Language } from '@/shared/types/Language';
import { TourDetailsItem } from './TourDetailsItem';

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
    <div>
      <TourDetailsItem title='Languages'>
        <LanguagesList languages={languages} />
      </TourDetailsItem>
      <TourDetailsItem title='First meeting'>
        <Typography fontSize='1.8rem'>
          {format(meetingDate, 'EEEE, d MMMM yyyy HH:mm')} in WanderWorld Cafe
        </Typography>
      </TourDetailsItem>
      <TourDetailsItem title='Activities'>
        <List sx={{ padding: 0 }}>
          {activities.map((name, index) => (
            <ListItem key={index}>{name}</ListItem>
          ))}
        </List>
      </TourDetailsItem>
    </div>
  );
};
