'use client';
import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'next/navigation';
import {
  useDeleteExpeditionMutation,
  useGetExpeditionQuery,
} from '@/redux/api/expeditionApi';
import { Languages } from '@/modules/languages';
import { getCountriesNames } from '@/utils/get-countries-names';
import { countries } from '@/lib/data/countries';
import { ExpeditionSection } from '@/modules/expedition-section';
import { DateRange } from '@/components/core/DateRange';
import { format } from 'date-fns';
import { getActivitiesNames } from '@/utils/get-activities-name';
import { activities } from '@/lib/data/activities';
import { Loader } from '@/components/core/Loader';
import { useSnackbar } from 'hooks/useSnackbar';
import { useRouter } from 'next/navigation';
import { useModal } from 'hooks/useModal';
const PageContent = () => {
  const { id } = useParams();
  const { openModal, closeModal } = useModal();
  const { showSnackBar } = useSnackbar();
  const { data: expedition, isLoading: isExpeditionLoading } =
    useGetExpeditionQuery(id as string);
  const router = useRouter();

  const [deleteExpedition, { isLoading: isDeleteExpeditionLoading }] =
    useDeleteExpeditionMutation();

  const renderExpeditionDetails = () => {
    if (!expedition) {
      return null; // Return null or some fallback UI if expedition is undefined
    }

    const onDelete = async (id: string) => {
      try {
        if (id) {
          await deleteExpedition(id as string);
          closeModal();
          showSnackBar('Your changes were saved!', 'success');
          router.push('/expeditions');
        }
      } catch (error) {
        showSnackBar('Something went wrong', 'warning');
      }
    };

    const handleOnDelete = () => {
      openModal({
        content: (
          <>
            <Typography mb='2.4rem'>
              Are you sure you want to delete expedition {expedition.name}?
            </Typography>
            <Stack direction='row' gap='1.2rem'>
              <Button
                variant='outlined'
                color='warning'
                onClick={closeModal}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                variant='contained'
                onClick={() => onDelete(id as string)}
                disabled={isDeleteExpeditionLoading}
                color='warning'
                fullWidth
              >
                Delete
              </Button>
            </Stack>
          </>
        ),
        title: 'Delete expedition',
      });
    };

    return (
      <Stack>
        <Stack
          mb='4.8rem'
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Box>
            <Typography variant='h1'>{expedition.name}</Typography>
            <Typography component='h2' variant='h6'>
              {expedition.description}
            </Typography>
          </Box>
          <Stack gap='1.2rem' direction='row'>
            <Button
              onClick={handleOnDelete}
              variant='contained'
              size='large'
              color='warning'
              disabled={isDeleteExpeditionLoading}
            >
              Delete
            </Button>
            <Button
              //   onClick={handleDelete}
              variant='contained'
              size='large'
              disabled={isDeleteExpeditionLoading}
            >
              Edit
            </Button>
          </Stack>
        </Stack>

        <Stack gap='2.4rem'>
          <ExpeditionSection
            title='Date'
            content={
              <DateRange
                startDate={expedition.startDate}
                endDate={expedition.endDate}
              />
            }
          />
          <ExpeditionSection
            title='Countries'
            content={
              <Typography>
                {getCountriesNames(expedition.countries, countries)}
              </Typography>
            }
          />
          <ExpeditionSection
            title='Languages'
            content={<Languages langCodes={expedition.languages} />}
          />

          <ExpeditionSection
            title='First Meeting'
            content={
              <Typography>
                {format(expedition.meetingDate, 'dd/MM/yyyy')}
              </Typography>
            }
          />
          <ExpeditionSection
            title='Status'
            content={<Typography>{expedition.status}</Typography>}
          />
          <ExpeditionSection
            title='Activities'
            content={
              <Typography>
                {getActivitiesNames(expedition.activities, activities)}
              </Typography>
            }
          />
          <ExpeditionSection
            title='Guide'
            content={<Typography>{expedition.guideId}</Typography>}
          />
          <ExpeditionSection
            title='Group Size'
            content={
              <Typography>
                {expedition.minGroupSize} - {expedition.maxGroupSize}{' '}
                participants
              </Typography>
            }
          />
        </Stack>
      </Stack>
    );
  };

  return <>{isExpeditionLoading ? <Loader /> : renderExpeditionDetails()}</>;
};

export default PageContent;
