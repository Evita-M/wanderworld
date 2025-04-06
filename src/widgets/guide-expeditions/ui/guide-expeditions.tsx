import { Box, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';
import { FC } from 'react';
import Link from 'next/link';
import FlightIcon from '@mui/icons-material/Flight';
import { Expedition } from '@/shared/types/expedition';
import { DateRange } from '@/shared/ui/components/date-range/date-range';
import { RoundedContainer } from '@/shared/ui/components/rounded-container/rounded-container';

interface GuideExpeditionsProps {
  expeditions: Expedition[];
}

export const GuideExpeditions: FC<GuideExpeditionsProps> = ({
  expeditions,
}) => {
  const theme = useTheme();

  return (
    <>
      {expeditions.map(({ name, startDate, endDate, id }, index) => (
        <Link
          href={`/expeditions/${id}`}
          passHref
          aria-label={`View details for ${name} expedition`}
        >
          <Stack
            borderRadius={theme.borderRadius.small}
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            gap='0.4rem'
            overflow='hidden'
            sx={{
              '&:hover .iconContainer': {
                transform: 'translateY(0) translateX(-50%)',
                opacity: 1,
              },
              '&:hover .nameText': {
                transform: 'translateX(40px)',
              },
            }}
          >
            <Stack position='relative'>
              <FlightIcon
                className='iconContainer'
                sx={{
                  color: theme.palette.primary.main,
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateX(-50%) translateY(100px)',
                  opacity: 0,
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                  rotate: '90deg',
                }}
              />
              <Typography
                variant='h6'
                className='nameText'
                sx={{
                  transition: 'transform 0.3s ease',
                }}
              >
                {name}
              </Typography>
            </Stack>
            <DateRange startDate={startDate} endDate={endDate} />
          </Stack>
        </Link>
      ))}
    </>
  );
};
