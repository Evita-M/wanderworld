'use client';

import {
  SubmitHandler,
  useFieldArray,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import {
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useMemo } from 'react';
import { RHFAutocomplete } from '@/components/core/RHFAutocomplete';
import { RHFCheckbox } from '@/components/core/RHFCheckbox';
import { RHFDateTimePicker } from '@/components/core/RHFDateTimePicker';
import { RHFDateRangePicker } from '@/components/core/RHFDateRangePicker';
import { RHFSlider } from '@/components/core/RHFSlider';
import { ExpeditionSchema, defaultValues } from '@/type/expeditionSchema';
import { Option } from '@/type/option';
import RHFTextField from '@/components/core/RHFTextField';
import { useCreateExpeditionMutation } from '@/redux/api/expeditionApi';
import { useGetGuidesQuery } from '@/redux/api/guideApi';
import CloseIcon from '@mui/icons-material/Close';
import { RHFSelect } from '@/components/core/RHFSelect';
import { countries } from '@/lib/data/countries';
import { languages } from '@/lib/data/languages';
import { RHFToggleButtonGroup } from '@/components/core/RHCToggleButtonGroup';
import { RHFSwitch } from '@/components/core/RHFSwitch';
import { CreateExpeditionRequestBody } from '@/app/(backend)/api/expeditions/route';
import { activities } from '@/lib/data/activities';

export const ExpeditionsForm = () => {
  const [
    createExpedition,
    {
      isLoading: isCreateExpeditionLoading,
      isSuccess: isCreateExpeditionSuccess,
    },
  ] = useCreateExpeditionMutation();
  const { data: guides, isLoading: isGetGuidesLoading } = useGetGuidesQuery();

  const {
    watch,
    control,
    unregister,
    reset,
    setValue,
    handleSubmit,
    register,
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext<ExpeditionSchema>();
  const hasParticipants = useWatch({ control, name: 'hasParticipants' });

  useEffect(() => {
    const sub = watch((value) => console.log({ value, isValid }));
    return () => sub.unsubscribe();
  }, [watch, isValid]);

  const { append, remove, replace, fields } = useFieldArray({
    control,
    name: 'participants',
  });

  useEffect(() => {
    if (!hasParticipants) {
      replace([]);
      unregister('participants');
    }
  }, [hasParticipants, replace, unregister]);

  //   useEffect(() => {
  //     if (userQuery.data) {
  //       reset(userQuery.data);
  //     }
  //   }, [reset, userQuery.data]);

  useEffect(() => {
    isCreateExpeditionSuccess && reset(defaultValues);
  }, [reset, isCreateExpeditionSuccess]);

  //   const handleOnExpeditionClick = (id: string) => {
  //     setValue('id', id);
  //   };

  const onSubmit: SubmitHandler<ExpeditionSchema> = (data) => {
    const newExpedition: CreateExpeditionRequestBody = {
      name: data.name,
      description: data.description,
      activities: data.activities,
      countries: data.countries,
      languages: data.languages,
      meetingDate: data.meetingDateTime,
      minGroupSize: data.groupSize[0],
      maxGroupSize: data.groupSize[1],
      startDate: data.tourDuration[0],
      endDate: data.tourDuration[1],
      participants: {
        create: data.hasParticipants ? data?.participants : [],
      },
      guide: data.guide ? { connect: { id: data.guide } } : undefined,
    };
    createExpedition(newExpedition);
  };

  const guidesOptions = useMemo(() => {
    return guides?.map((guide) => ({
      id: guide.id,
      label: `${guide.firstName} ${guide.lastName}`,
    }));
  }, [guides]);

  return (
    <Stack
      maxWidth='lg'
      m='0 auto'
      direction='row'
      component='form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Container>
        <Stack sx={{ gap: 4 }} mb='24px'>
          <RHFTextField<ExpeditionSchema>
            label='Expedtition name'
            {...register('name')}
          />
          <RHFTextField<ExpeditionSchema>
            label='Description'
            {...register('description')}
          />
          <RHFAutocomplete<ExpeditionSchema>
            label='Countries'
            options={countries}
            control={control}
            {...register('countries')}
          />
          <RHFAutocomplete<ExpeditionSchema>
            label='Languages'
            options={languages}
            control={control}
            {...register('languages')}
          />
          <RHFCheckbox<ExpeditionSchema>
            label='Activities'
            options={activities}
            control={control}
            {...register('activities')}
          />
          <RHFDateTimePicker<ExpeditionSchema>
            label='First expedition meeting'
            control={control}
            {...register('meetingDateTime')}
          />
          <RHFDateRangePicker<ExpeditionSchema>
            label='Expedition duration'
            control={control}
            {...register('tourDuration')}
          />
          <RHFSlider<ExpeditionSchema>
            label='Group size'
            limit={[0, 40]}
            control={control}
            {...register('groupSize')}
          />
          <RHFSelect<ExpeditionSchema>
            label='Guide'
            options={guidesOptions || []}
            control={control}
            {...register('guide')}
          />
        </Stack>
        {/* Switch for enabling/disabling participants */}
        <RHFSwitch
          label='Has Participants'
          control={control}
          {...register('hasParticipants')}
        />

        {hasParticipants && (
          <>
            {fields.map((field, index) => (
              <Stack key={field.id} position='relative' mb={2}>
                <Typography mb='14px'>Participant No {index + 1}</Typography>
                <RHFTextField<ExpeditionSchema>
                  label='First name'
                  {...register(`participants.${index}.firstName`)}
                />
                <RHFTextField<ExpeditionSchema>
                  label='Last name'
                  {...register(`participants.${index}.lastName`)}
                />
                <RHFTextField<ExpeditionSchema>
                  label='Email'
                  {...register(`participants.${index}.email`)}
                />
                <RHFTextField<ExpeditionSchema>
                  label='Phone number'
                  {...register(`participants.${index}.phoneNumber`)}
                />
                <IconButton
                  aria-label='Remove'
                  onClick={() => remove(index)}
                  type='button'
                  sx={{ position: 'absolute', top: 0, right: 0 }}
                >
                  <CloseIcon />
                </IconButton>
              </Stack>
            ))}
            <Button
              type='button'
              onClick={() =>
                append({
                  firstName: '',
                  lastName: '',
                  email: '',
                  phoneNumber: '',
                })
              }
            >
              Add Participant
            </Button>
          </>
        )}

        <Stack
          marginTop='32px'
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Button
            type='button'
            onClick={() => null}
            variant='outlined'
            color='primary'
          >
            Cancel
          </Button>
          <Button
            type='submit'
            variant='contained'
            color='success'
            disabled={!isValid}
          >
            Add expedition
          </Button>
        </Stack>
      </Container>
    </Stack>
  );
};
