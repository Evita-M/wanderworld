import { Button, Grid, Stack, Typography } from "@mui/material";
import RHFTextField from "../../core/input/RHFTextField";
import { RHFAutocomplete, RHFCheckbox, RHFDateRangePicker, RHFDateTimePicker, RHFSelect, RHFSlider } from "../../core/input";
import { Expedition } from "@/entities/expedition/model";
import { defaultValues, expeditionSchema, ExpeditionSchema } from "./validation";
import { languages } from "@/lib/data/languages";
import { countries } from "@/lib/data/countries";
import { FC, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { RichTextEditor } from "../../components/rich-text";
import { zodResolver } from "@hookform/resolvers/zod";
import { activities } from "@/lib/data/activities";
import { GuideCommon } from "@/entities/guide/model";
import { useGenerateDescriptionMutation } from "@/redux/api/groqApi";
import { useSnackbar } from "@/shared/hooks/useSnackbar";

interface ExpeditionFormProps {
  onSubmit: (data: ExpeditionSchema) => Promise<void>;
  isSubmitting?: boolean;
  onCancel: () => void;
  expedition?: Expedition;
  guides: any;
  buttonLabels: {
    cancel: string;
    submit: string;
  };
}

export const ExpeditionForm:FC<ExpeditionFormProps> = ({onSubmit, isSubmitting,guides, onCancel, expedition, buttonLabels}) => {
  const { showSnackBar } = useSnackbar();

  useEffect(() => {
    if (expedition) {
      reset(expDefaultValues);
    }
  }, [expedition]);


  const expDefaultValues = expedition
    ? {
        ...defaultValues,
        name: expedition.name,
        description: expedition.description || '',
        countries: expedition.countries,
        languages: expedition.languages,
        activities: expedition.activities,
        meetingDateTime: new Date(expedition.meetingDate),
        tourDuration: [
          new Date(expedition.startDate),
          new Date(expedition.endDate),
        ],
        groupSize: [expedition.minGroupSize, expedition.maxGroupSize],
        guide: expedition.guideId ?? undefined,
      }
    : defaultValues;

  const {
    control,
    reset,
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid },
    setValue,
  } = useForm<ExpeditionSchema>({
    defaultValues: expDefaultValues,
    resolver: zodResolver(expeditionSchema),
    mode: 'onChange',
  });
  // Memoize guides dropdown options
  const guidesOptions = useMemo(() => {
    return guides?.map((guide: GuideCommon) => ({
      id: guide.id,
      label: `${guide.firstName} ${guide.lastName}`,
    }));
  }, [guides]);

  const [generateDescription, { isLoading: isGeneratingDescriptionLoading }] =
    useGenerateDescriptionMutation();

const handleOnGenerateDescription = async () => {
    try {
      const formData = {
        name: watch('name'),
        countries: watch('countries'),
        languages: watch('languages'),
        activities: watch('activities'),
        groupSize: watch('groupSize') as [number, number],
        tourDuration: watch('tourDuration') as [Date, Date],
        meetingDate: watch('meetingDate'),
        guide: watch('guide'),
      };

      const { data } = await generateDescription(formData);
      if (data?.description) {
        setValue('description', data.description, {
          shouldValidate: true,
        });
      }
    } catch (error) {
      showSnackBar('Failed to generate description', 'error');
    }
  };

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} rowSpacing={5}>
        <Grid item xs={6}>
          <RHFTextField<ExpeditionSchema>
            label='Name'
            errorMessage={errors.name?.message}
            {...register('name')}
          />
        </Grid>
        <Grid item xs={6}>
          <RHFSelect<ExpeditionSchema>
            label='Guide'
            options={guidesOptions || []}
            control={control}
            errorMessage={errors.guide?.message}
            {...register('guide')}
          />
        </Grid>
        <Grid item xs={12}>
          <RHFAutocomplete<ExpeditionSchema>
            label='Countries'
            options={countries}
            control={control}
            errorMessage={errors.countries?.message}
            {...register('countries')}
          />
        </Grid>
        <Grid item xs={12}>
          <RHFDateRangePicker<ExpeditionSchema>
            label='Expedition duration'
            control={control}
            {...register('tourDuration')}
          />
        </Grid>
        <Grid item xs={12}>
          <RHFAutocomplete<ExpeditionSchema>
            label='Languages'
            options={languages}
            control={control}
            errorMessage={errors.languages?.message}
            {...register('languages')}
          />
        </Grid>
        <Grid item xs={6}>
          <RHFSlider<ExpeditionSchema>
            label='Group size'
            limit={[0, 40]}
            control={control}
            errorMessage={errors.groupSize?.message}
            {...register('groupSize')}
          />
        </Grid>
        <Grid item xs={6}>
          <RHFDateTimePicker<ExpeditionSchema>
            label='First meeting'
            control={control}
            {...register('meetingDate')}
          />
        </Grid>
        <Grid item xs={12}>
          <RHFCheckbox<ExpeditionSchema>
            label='Activities'
            options={activities}
            control={control}
            errorMessage={errors.activities?.message}
            {...register('activities')}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction='row' alignItems='center' spacing={2}>
            <Controller
              name='description'
              control={control}
              render={({ field }) => (
                <Stack width='100%'>
                  <Typography variant='caption' mb={2}>
                    Description
                  </Typography>
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                    initialContent={expedition?.description || ''}
                    onGenerateDescription={handleOnGenerateDescription}
                    isGenerating={isGeneratingDescriptionLoading}
                    isGenerationEnabled={isValid}
                  />
                </Stack>
              )}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack
            maxWidth='50rem'
            m='0 auto'
            spacing={3}
            direction='row'
            justifyContent='center'
          >
            <Button
              type='button'
              onClick={onCancel}
              variant='outlined'
              color='secondary'
              fullWidth
            >
              {buttonLabels.cancel}
            </Button>
            <Button
              fullWidth
              type='submit'
              variant='contained'
              disabled={
                !isValid || isSubmitting
              }
            >
              {buttonLabels.submit}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

