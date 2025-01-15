import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Controller, FieldValues, Path } from 'react-hook-form';

import { Option } from '@/type/option';

type RHFSelectProps<T extends FieldValues> = {
  name: Path<T>;
  options: Option[];
  label: string;
  control: any;
  errorMessage?: string;
};

export function RHFSelect<T extends FieldValues>({
  name,
  options,
  label,
  control,
  errorMessage,
}: RHFSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...fieldProps } }) => {
        return (
          <FormControl fullWidth>
            <InputLabel id={`${name}-label`} shrink>
              {label}
            </InputLabel>
            <Select
              labelId={`${name}-label`}
              id={name}
              displayEmpty
              label={label}
              value={value || ''}
              {...fieldProps}
            >
              <MenuItem value=''>None</MenuItem>
              {options.map((option) => (
                <MenuItem value={option.id} key={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {errorMessage && (
              <FormHelperText error>{errorMessage}</FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
}
