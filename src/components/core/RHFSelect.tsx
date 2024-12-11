import { FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller, FieldValues, Path } from 'react-hook-form';

import { Option } from '@/type/option';

type RHFSelectProps<T extends FieldValues> = {
  name: Path<T>;
  options: Option[];
  label: string;
  control: any;
  defaultValue?: string;
  errorMessage?: string;
};

export function RHFSelect<T extends FieldValues>({
  name,
  options,
  label,
  control,
  defaultValue = '',
  errorMessage,
}: RHFSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select
            labelId={`${name}-label`}
            defaultValue={defaultValue}
            {...field}
            id={name}
          >
            {options.map((option) => (
              <MenuItem value={option.id} key={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
        </>
      )}
    />
  );
}
