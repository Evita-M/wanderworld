import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { forwardRef, Ref } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

type RHFDateRangePickerProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: any;
  errorMessage?: string;
};

export const RHFDateRangePicker = forwardRef(<T extends FieldValues>(
  { name, label, control, errorMessage }: RHFDateRangePickerProps<T>,
  _ref: Ref<any>
) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, ...restField } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker
            label={label}
            format='dd/MM/yyyy'
            sx={{ gap: '1.2rem' }}
            value={Array.isArray(value) ? value : [new Date(), new Date()]}
            {...restField}
          />
        </LocalizationProvider>
      )}
    />
  );
});

RHFDateRangePicker.displayName = 'RHFDateRangePicker';
