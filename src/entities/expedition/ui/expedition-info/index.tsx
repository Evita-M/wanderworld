import Typography from '@mui/material/Typography';
import { List, ListItem, useTheme } from '@mui/material';
import { ExpeditionOverview } from '../expedition-overview';
import { ExpeditionDetails } from '../expedition-details';
import { getRandomColor } from '@/utils/get-random-color';
import { includedItems } from '@/lib/data/included';
import { RichTextRenderer } from '@/shared/ui/components/rich-text';
import { Expedition } from '../../model';
import { LanguageCode } from '@/shared/ui/modules/languages';
import { Tabs } from '@/shared/ui/core/tabs';


interface ExpeditionInfoProps {
  expedition: Expedition;
}

export const ExpeditionInfo: React.FC<ExpeditionInfoProps> = ({
  expedition,
}) => {
  const { minGroupSize, maxGroupSize, activities, languages } = expedition;
  const theme = useTheme();

  const tabs = [
    {
      label: 'Overview',
      content: <ExpeditionOverview groupSize={[minGroupSize, maxGroupSize]} />,
    },
    {
      label: 'Description',
      content: expedition.description ? (
        <RichTextRenderer content={expedition.description} />
      ) : null,
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
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  marginRight: '16px',
                  backgroundColor: getRandomColor(theme, index, 0.2),
                },
              }}
            >
              <Typography fontSize='1.8rem'>{item}</Typography>
            </ListItem>
          ))}
        </List>
      ),
    },
    {
      label: 'Tour details',
      content: (
        <ExpeditionDetails
          languages={languages as LanguageCode[]}
          meetingDate={expedition.meetingDate}
          activities={activities}
        />
      ),
    },
  ];

  return <Tabs tabs={tabs} />;
};
