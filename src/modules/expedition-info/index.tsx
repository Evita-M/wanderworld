import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ExpeditionOverview } from '../expedition-overview';
import { Expedition } from '@prisma/client';
import { ExpeditionDetails } from '../expedition-details';
import { LanguageCode } from '../languages';
import { useTheme } from '@mui/material';
import { getRandomColor } from '@/utils/get-random-color';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface ExpeditionInfoProps {
  expedition: Expedition;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const ExpeditionInfo: React.FC<ExpeditionInfoProps> = ({
  expedition,
}) => {
  const { minGroupSize, maxGroupSize, activities, languages } = expedition;
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const colorIndex = Math.floor(Math.random() * 10) + 1;
  const bgColor = getRandomColor(theme, colorIndex);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='expedition information tabs'
        >
          <Tab label='Overview' {...a11yProps(0)} />
          <Tab label='Description' {...a11yProps(1)} />
          <Tab label="What's included" {...a11yProps(2)} />
          <Tab label='Tour details' {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ExpeditionOverview groupSize={[minGroupSize, maxGroupSize]} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box
          bgcolor={bgColor}
          borderRadius='2rem'
          p='3.6rem'
          maxWidth='100rem'
          minHeight='30rem'
        >
          <Typography fontSize='1.8rem' lineHeight={1.6}>
            {expedition.description}
          </Typography>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <ExpeditionDetails
          languages={languages as LanguageCode[]}
          meetingDate={expedition.meetingDate}
          activities={activities}
        />
      </CustomTabPanel>
    </Box>
  );
};
