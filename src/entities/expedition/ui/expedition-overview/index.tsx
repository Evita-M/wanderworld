import { FC, ReactElement } from 'react';
import { Grid } from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import GroupIcon from '@mui/icons-material/Group';
import SupportIcon from '@mui/icons-material/Support';
import FlightIcon from '@mui/icons-material/Flight';
import { getTravelStyle } from '@/utils/get-travel-style';
import { SERVICE_LEVEL } from '@/lib/data/service-level';
import { PHYSICAL_RATING } from '@/lib/data/physical-rating';
import { OverviewItem } from './overview-item';
import { getGroupType } from '@/utils/get-group-type';

interface OverviewData {
  icon: ReactElement;
  title: string;
  description: string;
}

interface ExpeditionOverviewProps {
  groupSize: [number, number];
}

const createOverviewData = (groupSize: [number, number]): OverviewData[] => {
  const groupInfo = getGroupType(groupSize);
  const travelStyle = getTravelStyle(groupSize);

  return [
    {
      icon: <FlightIcon />,
      title: `Travel Style: ${travelStyle.style}`,
      description: travelStyle.description,
    },
    {
      icon: <SupportIcon />,
      title: SERVICE_LEVEL.title,
      description: SERVICE_LEVEL.description,
    },
    {
      icon: <DirectionsRunIcon />,
      title: PHYSICAL_RATING.title,
      description: PHYSICAL_RATING.description,
    },
    {
      icon: <GroupIcon />,
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
