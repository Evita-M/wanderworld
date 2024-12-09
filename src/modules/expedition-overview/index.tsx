import React, { cloneElement, FC, ReactElement } from 'react';
import { Grid, Stack, Typography, Box } from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import GroupIcon from '@mui/icons-material/Group';
import SupportIcon from '@mui/icons-material/Support';
import FlightIcon from '@mui/icons-material/Flight';

interface OverviewItemProps {
  icon: ReactElement;
  title: string;
  description: string;
}

const ICON_SIZE = '3.2rem';

const OverviewItem: FC<OverviewItemProps> = ({ icon, title, description }) => (
  <Stack direction='row' spacing={3}>
    {cloneElement(icon, { color: 'primary' })}
    <Box>
      <Typography fontWeight={600} fontSize='1.8rem' mb='0.8rem'>
        {title}
      </Typography>
      <Typography color='text.secondary' sx={{ whiteSpace: 'pre-line' }}>
        {description}
      </Typography>
    </Box>
  </Stack>
);

interface OverviewData {
  icon: ReactElement;
  title: string;
  description: string;
}

interface ExpeditionOverviewProps {
  groupSize: [number, number]; // [minGroupSize, maxGroupSize]
}

const getGroupTypeAndDescription = (
  groupSize: [number, number]
): { type: string; description: string } => {
  const [min, max] = groupSize;

  if (max <= 4) {
    return {
      type: 'Private',
      description: `Private experience\n Min ${min}, max ${max} travelers`,
    };
  } else if (max <= 16) {
    return {
      type: 'Small Group',
      description: `Small group experience\n Min ${min}, max ${max} travelers`,
    };
  } else if (max <= 26) {
    return {
      type: 'Medium Group',
      description: `Medium group experience\n Min ${min}, max ${max} travelers`,
    };
  } else {
    return {
      type: 'Large Group',
      description: `Large group experience\n Min ${min}, max ${max} travelers`,
    };
  }
};

const createOverviewData = (groupSize: [number, number]): OverviewData[] => {
  const groupInfo = getGroupTypeAndDescription(groupSize);

  return [
    {
      icon: <FlightIcon sx={{ fontSize: ICON_SIZE }} />,
      title: 'Travel Style: 1-to-Foursomethings',
      description:
        'Fast, fresh, and fun adventures that never slow down, made for young, budget-minded travellers.',
    },
    {
      icon: <SupportIcon sx={{ fontSize: ICON_SIZE }} />,
      title: 'Service Level: Basic',
      description:
        'Simple and clean hotels and hostels, affordable public and private transport, lots of optional activities.',
    },
    {
      icon: <DirectionsRunIcon sx={{ fontSize: ICON_SIZE }} />,
      title: 'Physical Rating: 2 - Light',
      description:
        'Light walking and hiking suitable for most fitness levels. Nothing too challenging.',
    },
    {
      icon: <GroupIcon sx={{ fontSize: ICON_SIZE }} />,
      title: `Trip Type: ${groupInfo.type}`,
      description: groupInfo.description,
    },
  ];
};

export const ExpeditionOverview: FC<ExpeditionOverviewProps> = ({
  groupSize,
}) => {
  const overviewData = createOverviewData(groupSize);

  return (
    <Grid container spacing={4}>
      {overviewData.map((item, index) => (
        <Grid item xs={12} md={6} key={index}>
          <OverviewItem
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        </Grid>
      ))}
    </Grid>
  );
};
