import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

type RHFDateRangePickerProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  errorMessage?: string;
};

export const RHFDateRangePicker = <T extends FieldValues>({
  name,
  label,
  control,
  errorMessage,
}: RHFDateRangePickerProps<T>) => {
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
};
