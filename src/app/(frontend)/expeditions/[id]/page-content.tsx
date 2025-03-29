'use client';
import {
  useDeleteExpeditionMutation,
  useGetExpeditionQuery,
} from '@/entities/expedition/api';
import { notFound, useParams, useRouter } from 'next/navigation';
import { Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { routes } from '@/lib/config/routes';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { useGetGuideQuery } from '@/entities/guide/api';
import { Loader } from '@/shared/ui/core/loader/loader';
import { PageHeader } from '@/shared/ui/core/typography/page-header';
import { ModalConfirmation } from '@/shared/ui/modules/modal/modal-confirmation';
import PeopleIcon from '@mui/icons-material/People';
import { handleRTKQueryError } from '@/utils/error-handler/error-handler';
import { useModal } from '@/lib/hooks/use-modal';
import { useSnackbar } from '@/lib/hooks/use-snackbar';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import Image from 'next/image';
import { differenceInDays } from 'date-fns';
import { ClockIcon } from '@mui/x-date-pickers';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Actions } from '@/shared/ui/modules/actions';
import { FeatureList } from '@/widgets/feature-list/ui/feature-list';
import { GuideInfo } from '@/widgets/guide-info/ui/guide-info';
import { ExpeditionTabs } from '@/widgets/expedition-tabs/ui/expedition-tabs';

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

  const duration =
    expedition?.startDate && expedition?.endDate
      ? Math.abs(
          differenceInDays(
            new Date(expedition.startDate),
            new Date(expedition.endDate)
          )
        )
      : 0;

  const features = [
    {
      icon: <LanguageOutlinedIcon color='primary' />,
      title: 'Languages',
      text:
        expedition?.languages?.map((language) => language.name).join(', ') ||
        'N/A',
    },
    {
      icon: <ClockIcon color='primary' />,
      title: 'Duration',
      text: `${duration} days`,
    },
    {
      icon: <PeopleIcon color='primary' />,
      title: 'Group Size',
      text: `${expedition?.minGroupSize} - ${expedition?.maxGroupSize}`,
    },
    {
      icon: <FitnessCenterIcon color='primary' />,
      title: 'Difficulty',
      text: 'Challenging',
    },
  ];

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
            <PageHeader title={expedition.name} />
            <div className='mt-[2.4rem] flex items-center gap-2'>
              <LocationOnOutlinedIcon color='primary' />
              <Typography variant='h5' component='p'>
                {expedition.countries
                  ?.map((country) => country.name)
                  .join(', ') || 'N/A'}
              </Typography>
            </div>
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
            <FeatureList features={features} />
          </div>
          <div className='space-y-6'>
            {guide ? (
              <GuideInfo
                id={guide?.id ?? ''}
                fullName={`${guide?.firstName} ${guide?.lastName}`}
                email={guide.email}
                avatar={guide?.avatar ?? ''}
              />
            ) : (
              <Typography>No guide assigned yet</Typography>
            )}
          </div>
          <div className='space-y-6 pt-8 lg:col-span-2'>
            <ExpeditionTabs
              description={expedition.description || ''}
              languages={expedition.languages}
              activities={expedition.activities || []}
              meetingDate={expedition.meetingDate}
            />
          </div>
        </div>
      </>
    )
  );
};

export default PageContent;
