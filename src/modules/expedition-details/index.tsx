import { FC } from 'react';
import { Languages, LanguageCode } from '../languages';
import { format } from 'date-fns';
import {
  Typography,
  Stack,
  List,
  ListItem,
  useTheme,
  Box,
} from '@mui/material';
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
      <Stack flexDirection='row'>
        <Box flex='0 20rem'>
          <Typography variant='caption' fontSize='1.4rem'>
            Languages
          </Typography>
        </Box>
        <Languages langCodes={languages} />
      </Stack>
      <Stack flexDirection='row'>
        <Box flex='0 20rem'>
          <Typography variant='caption' fontSize='1.4rem'>
            First meeting
          </Typography>
        </Box>
        <Typography fontSize='1.8rem'>
          {format(meetingDate, 'EEEE, d MMMM yyyy HH:mm')} in WanderWorld Cafe
        </Typography>
      </Stack>
      {activityNames.length > 0 && (
        <Stack flexDirection='row'>
          <Box flex='0 20rem'>
            <Typography variant='caption' fontSize='1.4rem'>
              Activities
            </Typography>
          </Box>
          <List sx={{ padding: 0 }}>
            {activityNames.map((name, index) => (
              <ListItem
                key={index}
                sx={{
                  display: 'flex',
                  gap: '0.6rem',
                  alignItems: 'center',
                  '&::before': {
                    content: '""',
                    display: 'block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    marginRight: '16px',
                    backgroundColor: getRandomColor(theme, index, 0.2),
                  },
                }}
              >
                <Typography fontSize='1.8rem'>{name}</Typography>
              </ListItem>
            ))}
          </List>
        </Stack>
      )}
    </Stack>
  );
};
