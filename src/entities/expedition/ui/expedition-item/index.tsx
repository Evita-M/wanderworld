import { countries as countrieList } from '@/lib/data/countries';
import { Grid, Stack, Typography, useTheme, Chip } from '@mui/material';
import { FC } from 'react';
import Link from 'next/link';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { routes } from '@/lib/config/routes';
import { Expedition } from '../../model';
import Image from 'next/image';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { borderRadius } from '@/styles/border-radius';
import { grey } from '@mui/material/colors';
import { differenceInDays, formatDate } from 'date-fns';
import ScheduleIcon from '@mui/icons-material/Schedule';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import { darken } from '@mui/material/styles';
import { getNames } from '@/utils/get-names';

const difficultyLevels = ['Easy', 'Moderate', 'Challenging', 'Hard'];
interface ExpeditionItemProps {
  expedition: Expedition;
}

export const ExpeditionItem: FC<ExpeditionItemProps> = ({ expedition }) => {
  const theme = useTheme();
  const { id, name, countries, startDate, maxGroupSize, endDate } = expedition;
  const duration = Math.abs(
    differenceInDays(new Date(startDate), new Date(endDate))
  );

  const randomDifficulty = difficultyLevels[
    Math.floor(Math.random() * difficultyLevels.length)
  ] as keyof typeof difficulty;

  const difficulty = {
    Easy: {
      color: theme.palette.custom.green.main,
      label: 'Easy',
    },
    Moderate: {
      color: theme.palette.custom.blue.main,
      label: 'Moderate',
    },
    Challenging: {
      color: theme.palette.custom.yellow.main,
      label: 'Challenging',
    },
    Hard: {
      color: theme.palette.custom.red.main,
      label: 'Hard',
    },
  };

  return (
    <Link href={`${routes.expeditions}/${id}`}>
      <Stack
        component='article'
        height='100%'
        overflow='hidden'
        borderRadius={borderRadius.large}
        className='group'
        border={`1px solid ${grey[300]}`}
      >
        <div className='relative h-[26rem] w-full overflow-hidden bg-gray-200'>
          <Image
            src='https://fakeimg.pl/600x400/d6e6eb/ffffff?text=WanderWorld&font=bebas'
            alt='Placeholder image'
            fill
            className='object-cover transition-transform duration-300 ease-in-out group-hover:scale-105'
          />
        </div>
        <Stack gap={3} p='2.4rem'>
          <Stack gap={1}>
            <Typography component='h3' variant='h5'>
              {name}
            </Typography>
            <div className='flex items-center gap-2'>
              <RoomOutlinedIcon color='primary' fontSize='small' />
              <Typography>
                {countries?.map((country) => country.name).join(', ')}{' '}
              </Typography>
            </div>
          </Stack>
          <Grid container spacing='1.2rem' alignItems='center'>
            <Grid item xs={12} md={6}>
              <div className='flex items-center gap-2'>
                <CalendarMonthOutlinedIcon color='primary' fontSize='small' />
                <Typography fontSize='1.4rem'>
                  {formatDate(new Date(startDate), 'MMM d, yyyy')}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className='flex items-center gap-2'>
                <ScheduleIcon color='primary' fontSize='small' />
                <Typography fontSize='1.4rem'>{duration} days</Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className='flex items-center gap-2'>
                <PeopleOutlineIcon color='primary' fontSize='small' />
                <Typography fontSize='1.4rem'>Max {maxGroupSize}</Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Chip
                label={randomDifficulty}
                sx={{
                  padding: '0.4rem 0.8rem',
                  backgroundColor: difficulty[randomDifficulty].color,
                  '& .MuiChip-label': {
                    color: darken(difficulty[randomDifficulty].color, 0.6),
                  },
                  '&:hover': {
                    backgroundColor: difficulty[randomDifficulty].color,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Link>
  );
};
