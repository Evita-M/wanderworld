import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller, FieldValues, Path, Control } from 'react-hook-form';
import { Option } from '@/shared/types';

interface RHFSelectProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  options: Option[];
}

export const RHFSelect = <T extends FieldValues>({
  name,
  label,
  control,
  options,
}: RHFSelectProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...fieldProps } }) => (
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
              <MenuItem value={option.id} key={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};
