'use client';
import {
  useDeleteExpeditionMutation,
  useGetExpeditionQuery,
} from '@/entities/expedition/api';
import { notFound, useParams, useRouter } from 'next/navigation';
import { Box, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { routes } from '@/lib/config/routes';

import { useGetGuideQuery } from '@/entities/guide/api';
import { Loader } from '@/shared/ui/core/loader';
import { Actions } from '@/shared/ui/modules/actions';
import { IconText, PageHeader } from '@/shared/ui/core/typography';
import { ModalConfirmation } from '@/shared/ui/modules/modal';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import { getNames } from '@/utils/get-names';
import { DateRange } from '@/shared/ui/components/date-range';
import { countries } from '@/lib/data/countries';
import { ExpeditionInfo } from '@/entities/expedition/ui/expedition-info';
import { MasonryGrid, MasonryItem } from '@/shared/ui/modules/masonry-grid';
import { GuideInfo } from '@/entities/guide/ui/guide-info';
import { BackButton } from '@/shared/ui/core/button';
import { handleRTKQueryError } from '@/utils/errorHandler';
import { useModal } from '@/lib/hooks/useModal';
import { useSnackbar } from '@/lib/hooks/useSnackbar';

const PageContent = () => {
  const { id } = useParams();
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const { showSnackBar } = useSnackbar();
  const [deleteExpedition, { isLoading: isDeleteExpeditionLoading }] =
    useDeleteExpeditionMutation();

  const {
    data: expedition,
    isLoading: isExpeditionLoading,
    error: expeditionError,
    isError: isExpeditionError,
  } = useGetExpeditionQuery(id as string);

  const {
    data: guide,
    isLoading: isGuideLoading,
    error: guideError,
    isError: isGuideError,
  } = useGetGuideQuery(expedition?.guideId ?? '', {
    skip: !expedition?.guideId,
  });

  if (isExpeditionLoading || isGuideLoading) {
    return (
      <Stack justifyContent='center' height='100%' flex='1 1 100%'>
        <Loader />
      </Stack>
    );
  }

  if (isExpeditionError) {
    handleRTKQueryError(expeditionError);
  }

  if (isGuideError) {
    handleRTKQueryError(guideError);
  }

  if (!expedition && !isExpeditionLoading) {
    notFound();
  }

  const redirectToExpeditions = () => router.push(routes.expeditions);

  const handleDelete = async () => {
    try {
      await deleteExpedition(id as string).unwrap();
      closeModal();
      showSnackBar('Expedition deleted successfully', 'success');
      router.push('/expeditions');
    } catch (error) {
      showSnackBar('Failed to delete expedition', 'error');
    }
  };

  const handleDeleteConfirmation = () => {
    openModal({
      title: 'Delete expedition',
      content: (
        <ModalConfirmation
          text={`Are you sure you want to delete expedition ${expedition?.name}?`}
          submitBtnLabel='Delete'
          onCancel={closeModal}
          onSubmit={handleDelete}
          isDisabled={isDeleteExpeditionLoading}
        />
      ),
    });
  };

  const actions = [
    {
      label: 'Edit',
      icon: <EditIcon />,
      onClick: () => router.push(`${routes.expeditions}/${id}/edit`),
    },
    {
      label: 'Delete',
      icon: <DeleteIcon />,
      onClick: handleDeleteConfirmation,
      color: 'error' as const,
    },
  ];

  const countryNames = getNames(expedition?.countries ?? [], countries);

  return (
    expedition && (
      <>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          mb='2.4rem'
        >
          <PageHeader
            title={expedition.name}
            prefix={<BackButton onClick={redirectToExpeditions} />}
          />
          <Actions actions={actions} />
        </Stack>
        <Stack spacing='2.4rem'>
          <Stack flexDirection='row' spacing='4.4rem'>
            <DateRange
              startDate={expedition.startDate}
              endDate={expedition.endDate}
            />
            <IconText
              icon={<LocationOnIcon color='primary' />}
              text={countryNames}
            />
            <IconText
              icon={<PeopleIcon color='primary' />}
              text={`${expedition.minGroupSize} - ${expedition.maxGroupSize} participants`}
            />
          </Stack>
          <Stack flexDirection='row' spacing='2rem'>
            <Box flex='0 1 160rem'>
              <MasonryGrid columns={3} spacing={2}>
                {[
                  { height: 395 },
                  { height: 220 },
                  { height: 160 },
                  { height: 220 },
                  { height: 160 },
                ].map((item, index) => (
                  <MasonryItem key={index} height={item.height}>
                    <div className='h-full w-full bg-gray-100' />
                  </MasonryItem>
                ))}
              </MasonryGrid>
            </Box>
            <Box flex='0 0 40rem' pb='1rem'>
              <h2 className='sr-only'>Guide Detail</h2>
              <GuideInfo guide={guide} />
            </Box>
          </Stack>

          <Stack maxWidth='120rem' p='1rem'>
            <ExpeditionInfo expedition={expedition} />
          </Stack>
        </Stack>
      </>
    )
  );
};

export default PageContent;
