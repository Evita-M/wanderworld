'use client';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
  useTheme,
  Box,
} from '@mui/material';
import { differenceInDays } from 'date-fns';
import Link from 'next/link';
import { DateRange } from '@/shared/ui/components/date-range/date-range';
import { IconCaption } from '@/shared/ui/core/icon-caption/icon-caption';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { LanguageOutlined } from '@mui/icons-material';
import { FavoriteButton } from '@/shared/ui/components/favorite-button/favorite-button';
import { useState } from 'react';
import { Country } from '@/shared/types/country';
import { Language } from '@/shared/types/language';
import { routes } from '@/lib/config/routes';

interface ExpeditionCardProps {
  id: string;
  name: string;
  startDate: string | Date;
  endDate: string | Date;
  languages: Language[];
  countries: Country[];
}

export function ExpeditionItem({
  id,
  name,
  startDate,
  endDate,
  languages,
  countries,
}: ExpeditionCardProps) {
  const theme = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);

  const days =
    differenceInDays(new Date(endDate), new Date(startDate)) || undefined;
  const expeditionLink = `${routes.expeditions}/${id}`;
  const languageNames =
    languages?.map((language) => language.name).join(', ') || undefined;

  return (
    <Box position='relative'>
      <FavoriteButton
        isFavorite={isFavorite}
        onToggle={setIsFavorite}
        sx={{
          position: 'absolute',
          zIndex: 2,
          right: '1.2rem',
          top: '3rem',
          transform: 'translateY(-50%)',
        }}
      />
      <Link href={expeditionLink}>
        <Card
          sx={{
            // p: '0.6rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            backgroundColor: 'white',
            boxShadow: 'none',
            borderRadius: '1.6rem',
            overflow: 'hidden',
            position: 'relative',
            '&:hover': {
              boxShadow: '0 12px 24px -10px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <CardMedia
            component='img'
            sx={{
              borderRadius: '1.2rem 1.2rem 0 0',
              height: 280,
              backgroundColor: theme.palette.primary.light,
            }}
            image='https://fakeimg.pl/600x400/ADBEAF/ffffff?text=WanderWorld&font=bebas'
            alt={name}
          />
          <CardContent
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              padding: '1.6rem',
              position: 'relative',
              '&:last-child': {
                paddingBottom: '1.6rem',
              },
            }}
          >
            <Typography variant='h6' component='h2' mb='0.6rem'>
              {name}
            </Typography>
            <Stack spacing={1}>
              <DateRange startDate={startDate} endDate={endDate} />
              {days && (
                <IconCaption icon={<AccessTimeIcon />} text={`${days} days`} />
              )}
              {languageNames && (
                <IconCaption icon={<LanguageOutlined />} text={languageNames} />
              )}
            </Stack>
            <Stack
              direction='row'
              spacing={1}
              pt={1}
              sx={{ flexWrap: 'wrap', gap: 1 }}
            >
              {countries?.map((country: Country) => (
                <Chip
                  key={country.code}
                  label={country.name}
                  size='small'
                  sx={{
                    backgroundColor: theme.palette.secondary.light,
                    color: theme.palette.secondary.contrastText,
                    border: 'none',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '0.8rem',
                    letterSpacing: '0.08em',
                    '&:hover': {
                      backgroundColor: theme.palette.secondary.light,
                    },
                  }}
                />
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
}
