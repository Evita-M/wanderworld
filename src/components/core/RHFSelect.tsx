import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
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
      render={({ field }) => (
        <FormControl fullWidth>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select
            labelId={`${name}-label`}
            label={label}
            id={name}
            {...field}
            onChange={(e) => field.onChange(e.target.value)}
          >
            <MenuItem value=''>No guide</MenuItem>
            {options.map((option) => (
              <MenuItem value={option.id} key={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
