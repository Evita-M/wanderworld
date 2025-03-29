import { Stack, TextField } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface RHFTextFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  errorMessage?: string;
}

export const RHFTextField = <T extends FieldValues>({
  name,
  control,
  ...props
}: RHFTextFieldProps<T>) => {
  return (
    <Stack>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField {...props} {...field} InputLabelProps={{ shrink: true }} />
        )}
      />
    </Stack>
  );
};
