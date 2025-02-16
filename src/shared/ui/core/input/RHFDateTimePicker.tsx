import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { forwardRef, Ref } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Stack } from '@mui/material';

type RHFDateTimePickerProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: any;
  errorMessage?: string;
};

export const RHFDateTimePicker = forwardRef(
  <T extends FieldValues>(
    { name, label, control, errorMessage }: RHFDateTimePickerProps<T>,
    _ref: Ref<any>
  ) => {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack>
              <DateTimePicker
                label={label}
                views={['day', 'month', 'year', 'hours', 'minutes']}
                format='dd/MM/yyyy HH:mm'
                {...field}
              />
            </Stack>
          </LocalizationProvider>
        )}
      />
    );
  }
);

RHFDateTimePicker.displayName = 'RHFDateTimePicker';
