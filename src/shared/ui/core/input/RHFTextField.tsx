import { Stack, TextField, Typography } from '@mui/material';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { forwardRef, Ref } from 'react';

type RHFTextFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: any;
  errorMessage?: string;
};

export const RHFTextField = forwardRef(<T extends FieldValues>(
  { name, label, errorMessage, control, ...rest }: RHFTextFieldProps<T>,
  _ref: Ref<any>
) => {
  return (
    <Stack>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
        <TextField
          label={label}
          error={!!errorMessage}
          helperText={errorMessage}
          InputLabelProps={{ shrink: true }}
          {...field}
        />
      )}
    />
    </Stack>
  );
});

RHFTextField.displayName = 'RHFTextField';
