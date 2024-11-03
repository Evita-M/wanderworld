import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
import { Expedition } from '@prisma/client';
import React, { FC } from 'react';
import Link from 'next/link';
import FlightIcon from '@mui/icons-material/Flight';
import { DateRange } from '@/components/core/DateRange';

interface GuideExpeditionsProps {
  expeditions: Expedition[];
}

export const GuideExpeditions: FC<GuideExpeditionsProps> = ({
  expeditions,
}) => {
  const theme = useTheme();

  return (
    <Stack gap='0.4rem'>
      {expeditions.map(({ name, startDate, endDate, id }, index) => (
        <Box key={id}>
          <Link
            href={`/expeditions/${id}`}
            passHref
            aria-label={`View details for ${name} expedition`}
          >
            <Stack
              p='0.6rem 1.2rem'
              borderRadius='0.8rem'
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
          {index < expeditions.length - 1 && <Divider />}
        </Box>
      ))}
    </Stack>
  );
};
