'use client';
import {
  useDeleteExpeditionMutation,
  useGetExpeditionQuery,
} from '@/entities/expedition/api';
import { notFound, useParams, useRouter } from 'next/navigation';
import { Chip, Stack, Typography, useTheme } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
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
import { Actions } from '@/shared/ui/modules/actions';
import { FeatureList } from '@/widgets/feature-list/ui/feature-list';
import { ExpeditionTabs } from '@/widgets/expedition-tabs/ui/expedition-tabs';
import { BackButton } from '@/shared/ui/core/button/back-button';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { RoundedContainer } from '@/shared/ui/components/rounded-container/rounded-container';
import { GuideInfo } from '@/widgets/guide-info/ui/guide-info';

const PageContent = () => {
  const { id } = useParams();
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const { showSnackBar } = useSnackbar();
  const [deleteExpedition, { isLoading: isDeleteExpeditionLoading }] =
    useDeleteExpeditionMutation();
  const theme = useTheme();

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
      label: 'Delete',
      icon: <DeleteOutlinedIcon />,
      onClick: handleDeleteConfirmation,
      color: 'secondary' as const,
    },
    {
      label: 'Edit',
      icon: <ModeEditOutlineOutlinedIcon />,
      onClick: () => router.push(`${routes.expeditions}/${id}/edit`),
      color: 'tertiary' as const,
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
      icon: <LanguageOutlinedIcon />,
      title: 'Languages',
      text:
        expedition?.languages?.map((language) => language.name).join(', ') ||
        'N/A',
    },
    {
      icon: <ClockIcon />,
      title: 'Duration',
      text: `${duration} days`,
    },
    {
      icon: <PeopleIcon />,
      title: 'Group Size',
      text: `${expedition?.minGroupSize} - ${expedition?.maxGroupSize}`,
    },
    {
      icon: <FitnessCenterIcon />,
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
            <PageHeader
              title={expedition.name}
              prefix={<BackButton />}
              sx={{ mb: '3.6rem' }}
            />
            <div className='flex items-center gap-2'>
              {expedition.countries?.map((country) => (
                <Chip
                  key={country.id}
                  label={country.name}
                  color='secondary'
                  size='medium'
                  sx={{ backgroundColor: theme.palette.secondary.light }}
                />
              ))}
            </div>
          </div>
          <Actions actions={actions} />
        </Stack>

        <div className='grid gap-8 lg:grid-cols-3'>
          <div className='space-y-6 lg:col-span-2'>
            <FeatureList features={features} />
            <div className='relative aspect-video overflow-hidden rounded-[2.4rem]'>
              <Image
                src='https://fakeimg.pl/600x400/acc2bc/ffffff?text=WanderWorld&font=bebas'
                alt='Placeholder image'
                fill
                className='object-cover'
              />
            </div>
          </div>
          <div className='space-y-6'>
            <RoundedContainer sx={{ p: 0 }}>
              {guide ? (
                <GuideInfo
                  onClick={() => router.push(`${routes.guides}/${guide.id}`)}
                  name={`${guide?.firstName} ${guide?.lastName}`}
                  email={guide.email}
                  phoneNumber={guide.phoneNumber}
                  avatar={guide?.avatar ?? ''}
                  languagesCount={guide?.languages?.length ?? 0}
                  expeditionsCount={guide?.expeditions?.length ?? 0}
                />
              ) : (
                <Typography>No guide assigned yet</Typography>
              )}
            </RoundedContainer>
          </div>
          <div className='space-y-6 pt-8 lg:col-span-2'>
            <RoundedContainer sx={{ minHeight: '48rem' }}>
              <ExpeditionTabs
                description={expedition.description || ''}
                languages={expedition.languages}
                activities={expedition.activities || []}
                meetingDate={expedition.meetingDate}
              />
            </RoundedContainer>
          </div>
        </div>
      </>
    )
  );
};

export default PageContent;
