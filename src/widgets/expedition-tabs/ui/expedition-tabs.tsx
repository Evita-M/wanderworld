import Typography from '@mui/material/Typography';
import { List, ListItem, useTheme } from '@mui/material';
import { getRandomColor } from '@/utils/get-random-color';
import { includedItems } from '@/lib/data/included';
import { RichTextRenderer } from '@/shared/ui/components/rich-text';
import { Tabs } from '@/shared/ui/core/tabs/tabs';
import { FC } from 'react';
import { TourDetails } from '@/widgets/tour-details/ui/tour-details';
import { Language } from '@/shared/types/language';

interface ExpeditionTabsProps {
  activities: string[];
  languages: Language[];
  meetingDate: Date;
  description?: string;
}

export const ExpeditionTabs: FC<ExpeditionTabsProps> = ({
  description,
  activities,
  languages,
  meetingDate,
}) => {
  const theme = useTheme();

  const tabs = [
    {
      label: 'Description',
      content: description ? (
        <RichTextRenderer content={description} />
      ) : (
        <Typography>No description</Typography>
      ),
    },
    {
      label: "What's included",
      content: (
        <List sx={{ padding: 0 }}>
          {includedItems.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                display: 'flex',
                gap: '0.6rem',
                alignItems: 'center',
                '&::before': {
                  content: '""',
                  display: 'block',
                  width: '0.8rem',
                  height: '0.8rem',
                  borderRadius: '50%',
                  marginRight: '1.6rem',
                  backgroundColor: getRandomColor(theme, index, 0.2),
                },
              }}
            >
              <Typography>{item}</Typography>
            </ListItem>
          ))}
        </List>
      ),
    },
    {
      label: 'Tour details',
      content: (
        <TourDetails
          languages={languages}
          meetingDate={meetingDate}
          activities={activities}
        />
      ),
    },
  ];

  return <Tabs tabs={tabs} />;
};
