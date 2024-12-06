import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { Stack, Typography } from '@mui/material';

type RHFDateRangePickerProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  control: any;
};

export function RHFDateRangePicker<T extends FieldValues>({
  name,
  label,
  control,
}: RHFDateRangePickerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, ...restField } }) => (
        <Stack>
          {label && (
            <Typography fontSize='22px' mb='24px'>
              {label}
            </Typography>
          )}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              {...restField}
              value={Array.isArray(value) ? value : [null, null]}
            />
          </LocalizationProvider>
        </Stack>
      )}
    />
  );
}
