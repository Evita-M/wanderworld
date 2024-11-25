import { Stack, Typography } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

type RHFDateTimePickerProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  control: any;
};

export function RHFDateTimePicker<T extends FieldValues>({
  name,
  label,
  control,
}: RHFDateTimePickerProps<T>) {
  return (
    <Stack>
      {label && (
        <Typography fontSize='22px' mb='24px'>
          {label}
        </Typography>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker label={label} {...field} />
          </LocalizationProvider>
        )}
      />
    </Stack>
  );
}
