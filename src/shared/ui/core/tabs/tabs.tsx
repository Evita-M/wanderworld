import { FC, useState } from 'react';
import { Tabs as MuiTabs, Tab as MuiTab } from '@mui/material';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface TabsProps {
  tabs: {
    label: string;
    content: React.ReactNode;
  }[];
}

const CustomTabPanel: FC<TabPanelProps> = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p='1.2rem'>{children}</Box>}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const Tabs: FC<TabsProps> = ({ tabs }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <MuiTabs
          value={value}
          onChange={handleChange}
          aria-label='information tabs'
        >
          {tabs.map((tab, index) => (
            <MuiTab key={index} label={tab.label} {...a11yProps(index)} />
          ))}
        </MuiTabs>
      </Box>
      {tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
};
