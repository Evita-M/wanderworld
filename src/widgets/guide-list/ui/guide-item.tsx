import { FC } from 'react';
import { Language } from '@/shared/types/language';
import { Box, Card, CardContent, Typography, Chip, Stack } from '@mui/material';
import { routes } from '@/lib/config/routes';
import Link from 'next/link';
import { LanguagesList } from '@/shared/ui/modules/languages/languages-list';
import { Avatar } from '@/shared/ui/core/avatar/avatar';
import { RichTextRenderer } from '@/shared/ui/components/rich-text';

interface GuideItemProps {
  name: string;
  languages: Language[];
  id: string;
  description?: string;
  avatarSrc?: string;
}

export const GuideItem: FC<GuideItemProps> = ({
  name,
  languages,
  description,
  id,
  avatarSrc,
}) => {
  const guideLink = `${routes.guides}/${id}`;
  return (
    <Box position='relative' component='article'>
      <Link href={guideLink}>
        <Card
          sx={{
            height: '100%',
            minHeight: '30rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.4rem',
            cursor: 'pointer',
            padding: '2.4rem',
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
          <Stack direction='row' gap={2} alignItems='flex-start'>
            <Avatar alt={name} size={120} src={avatarSrc} />
            <Stack gap='2rem' flexGrow={1} position='relative'>
              <Chip
                label='Pro'
                size='small'
                sx={{
                  position: 'absolute',
                  textTransform: 'uppercase',
                  top: '0',
                  right: '0',
                  backgroundColor: '#EBBE4D',
                }}
              />
              <Box>
                <Typography variant='h4' component='p' mb='0.8rem'>
                  {name}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  WanderWorld Guide
                </Typography>
              </Box>
              <LanguagesList languages={languages} />
            </Stack>
          </Stack>
          <Stack gap='0.8rem' flexGrow={1}>
            <Typography variant='caption' color='text.secondary'>
              About
            </Typography>
            {description?.length ? (
              <Box
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <RichTextRenderer content={description} />
              </Box>
            ) : (
              <Typography variant='caption' color='text.secondary'>
                No info about this guide
              </Typography>
            )}
          </Stack>
        </Card>
      </Link>
    </Box>
  );
};
