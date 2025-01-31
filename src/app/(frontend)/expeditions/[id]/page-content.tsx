'use client';

import {
  useDeleteExpeditionMutation,
  useGetExpeditionQuery,
} from '@/redux/api/expeditionApi';
import { useParams, useRouter } from 'next/navigation';
import { Box, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { routes } from '@/routes/index';
import { useModal } from '@/shared/hooks/useModal';
import { useSnackbar } from '@/shared/hooks/useSnackbar';
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
import { MasonryGrid, MasonryImage, MasonryItem } from '@/shared/ui/modules/masonry-grid';
import { GuideInfo } from '@/entities/guide/ui/guide-info';


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
    isError: isExpeditionError,
  } = useGetExpeditionQuery(id as string);

  const {
    data: guide,
    isLoading: isGuideLoading,
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

  if (isExpeditionError || isGuideError) {
    throw new Error('Failed to load expedition details');
  }

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
          <PageHeader title={expedition.name} />
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
                { height: 160 }
              ].map((item, index) => (
                <MasonryItem key={index} height={item.height}>
                  <div className="w-full h-full bg-gray-100" />
                </MasonryItem>
              ))}
            </MasonryGrid>
          </Box>
          <Box flex='0 0 40rem' pb='1rem'>
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
