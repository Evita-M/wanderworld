import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Stack } from '@mui/material';

type RHFDateTimePickerProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  errorMessage?: string;
};

export const RHFDateTimePicker = <T extends FieldValues>({
  name,
  label,
  control,
  errorMessage,
}: RHFDateTimePickerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack>
            <DateTimePicker
              label={label}
              views={['day', 'month', 'year']}
              format='dd/MM/yyyy'
              {...field}
            />
          </Stack>
        </LocalizationProvider>
      )}
    />
  );
};
