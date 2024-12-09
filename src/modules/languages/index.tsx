import React, { FC, useRef, useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Chip, darken, Stack, IconButton, Box } from '@mui/material';
import { getLanguageColor } from '@/utils/get-languages-color';
import { languages } from '@/lib/data/languages';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export type LanguageCode =
  | 'en'
  | 'es'
  | 'pt'
  | 'ar'
  | 'de'
  | 'ru'
  | 'zh'
  | 'hi'
  | 'fr';

interface LanguagesProps {
  langCodes: LanguageCode[];
}

export const Languages: FC<LanguagesProps> = ({ langCodes }) => {
  const theme = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const [showLeftScroll, setShowLeftScroll] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
      const isAtEnd = scrollWidth - (scrollLeft + clientWidth) < 10;
      const isAtStart = scrollLeft < 10;
      setShowRightScroll(!isAtEnd);
      setShowLeftScroll(!isAtStart);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [langCodes]);

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + 200,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft - 200,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    checkScroll();
  };

  return (
    <Stack direction='row' alignItems='center' sx={{ position: 'relative' }}>
      {showLeftScroll && (
        <>
          <Box
            sx={{
              position: 'absolute',
              left: -32,
              top: 0,
              bottom: 0,
              width: '40px',
              background:
                'linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,1))',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />
          <IconButton
            onClick={handleScrollLeft}
            size='small'
            sx={{
              position: 'absolute',
              left: -32,
              backgroundColor: 'background.paper',
              boxShadow: 1,
              zIndex: 2,
              '&:hover': {
                backgroundColor: 'background.paper',
              },
            }}
          >
            <ArrowBackIosIcon fontSize='small' />
          </IconButton>
        </>
      )}
      <Stack
        ref={scrollRef}
        direction='row'
        gap='0.8rem'
        onScroll={handleScroll}
        sx={{
          maxWidth: '100%',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          pb: '0.4rem',
          position: 'relative',
        }}
      >
        {langCodes.map((langCode) => {
          const language = languages.find((lang) => lang.id === langCode);
          const color = getLanguageColor(theme, langCode);
          return (
            <Chip
              key={langCode}
              label={language?.label}
              sx={{
                cursor: 'default',
                flexShrink: 0,
                backgroundColor: color?.main,
                '& .MuiChip-label': {
                  color: color?.text,
                },
                '&:hover': {
                  backgroundColor: color?.main
                    ? darken(color.main, 0.05)
                    : undefined,
                },
              }}
            />
          );
        })}
      </Stack>
      {showRightScroll && (
        <>
          <Box
            sx={{
              position: 'absolute',
              right: -32,
              top: 0,
              bottom: 0,
              width: '40px',
              background:
                'linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />
          <IconButton
            onClick={handleScrollRight}
            size='small'
            sx={{
              position: 'absolute',
              right: -32,
              border: 'none',
              backgroundColor: 'transparent',
              boxShadow: 1,
              zIndex: 2,
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <ArrowForwardIosIcon fontSize='small' />
          </IconButton>
        </>
      )}
    </Stack>
  );
};
