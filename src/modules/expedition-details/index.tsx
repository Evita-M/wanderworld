import { FC } from 'react';
import { Languages, LanguageCode } from '../languages';
import { format } from 'date-fns';
import { Typography, Stack, List, ListItem, useTheme } from '@mui/material';
import { activities as activitiesList } from '@/lib/data/activities';
import { getNames } from '@/utils/get-names';
import { getRandomColor } from '@/utils/get-random-color';

interface ExpeditionDetailsProps {
  languages: LanguageCode[];
  meetingDate: Date;
  activities: string[];
}

export const ExpeditionDetails: FC<ExpeditionDetailsProps> = ({
  languages,
  meetingDate,
  activities,
}) => {
  const theme = useTheme();
  const activityNames = getNames(activities, activitiesList).split(',');

  return (
    <Stack gap={3}>
      <Stack flexDirection='row' alignItems='center'>
        <Typography fontWeight='bold' sx={{ width: '140px' }}>
          Languages
        </Typography>
        <Languages langCodes={languages} />
      </Stack>

      <Stack flexDirection='row' alignItems='center'>
        <Typography fontWeight='bold' sx={{ width: '140px' }}>
          First meeting
        </Typography>
        <Typography>
          {format(meetingDate, 'EEEE, d MMMM yyyy HH:mm')}
        </Typography>
      </Stack>
      {activityNames.length > 0 && (
        <Stack gap={1}>
          <Typography fontWeight='bold'>Activities</Typography>
          <List sx={{ padding: 0 }}>
            {activityNames.map((name, index) => (
              <ListItem
                key={index}
                sx={{
                  padding: '4px 0',
                  display: 'flex',
                  alignItems: 'center',
                  '&::before': {
                    content: '""',
                    display: 'block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    marginRight: '12px',
                    backgroundColor: getRandomColor(theme, index, 0.2),
                  },
                }}
              >
                <Typography>{name}</Typography>
              </ListItem>
            ))}
          </List>
        </Stack>
      )}
    </Stack>
  );
};
