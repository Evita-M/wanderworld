import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { DateRangePicker } from '@mui/x-date-pickers-pro';

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
}
