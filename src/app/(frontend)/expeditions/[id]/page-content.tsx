'use client';
import {
  useDeleteExpeditionMutation,
  useGetExpeditionQuery,
} from '@/entities/expedition/api';
import { notFound, useParams, useRouter } from 'next/navigation';
import { Grid, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { routes } from '@/lib/config/routes';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { useGetGuideQuery } from '@/entities/guide/api';
import { Loader } from '@/shared/ui/core/loader';
import { Actions } from '@/shared/ui/modules/actions';
import { PageHeader } from '@/shared/ui/core/typography';
import { ModalConfirmation } from '@/shared/ui/modules/modal';
import PeopleIcon from '@mui/icons-material/People';
import { getNames } from '@/utils/get-names';
import { countries } from '@/lib/data/countries';
import { ExpeditionInfo } from '@/entities/expedition/ui/expedition-info';
import { GuideInfo } from '@/entities/guide/ui/guide-info';
import { BackButton } from '@/shared/ui/core/button';
import { handleRTKQueryError } from '@/utils/errorHandler';
import { useModal } from '@/lib/hooks/useModal';
import { useSnackbar } from '@/lib/hooks/useSnackbar';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import Image from 'next/image';
import { Feature } from '@/shared/ui/components/feature';
import { differenceInDays } from 'date-fns';
import { ClockIcon } from '@mui/x-date-pickers';
import { languages } from '@/lib/data/languages';

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
  const expeditionlanguages = getNames(expedition?.languages ?? [], languages);
  const duration =
    expedition?.startDate && expedition?.endDate
      ? Math.abs(
          differenceInDays(
            new Date(expedition.startDate),
            new Date(expedition.endDate)
          )
        )
      : 0;

  return (
    expedition && (
      <>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          mb='2.4rem'
        >
          <div>
            <PageHeader
              title={expedition.name}
              prefix={<BackButton onClick={redirectToExpeditions} />}
            />
            <Typography variant='h5' component='p' mt='2.4rem'>
              {countryNames}
            </Typography>
          </div>
          <Actions actions={actions} />
        </Stack>
        <div className='grid gap-8 lg:grid-cols-3'>
          <div className='space-y-6 lg:col-span-2'>
            <div className='relative aspect-video overflow-hidden rounded-[16px]'>
              <Image
                src='https://fakeimg.pl/600x400/d6e6eb/ffffff?text=WanderWorld&font=bebas'
                alt='Placeholder image'
                fill
                className='object-cover'
              />
            </div>
            <Grid className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Grid item xs={12} md={6}>
                <Feature
                  title='Languages'
                  text={expeditionlanguages}
                  icon={<LanguageOutlinedIcon color='primary' />}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Feature
                  title='Duration'
                  text={`${duration} days`}
                  icon={<ClockIcon color='primary' />}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Feature
                  title='Group Size'
                  text={`${expedition.minGroupSize} - ${expedition.maxGroupSize}`}
                  icon={<PeopleIcon color='primary' />}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Feature
                  title='Difficulty'
                  text='Challenging'
                  icon={<FitnessCenterIcon color='primary' />}
                />
              </Grid>
            </Grid>
          </div>
          <div className='space-y-6'>
            <GuideInfo guide={guide} />
          </div>
          <div className='space-y-6 pt-8 lg:col-span-2'>
            <ExpeditionInfo expedition={expedition} />
          </div>
        </div>
      </>
    )
  );
};

export default PageContent;
