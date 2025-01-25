import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { forwardRef, Ref } from 'react';
import { Option } from '@/shared/types';

type RHFSelectProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: any;
  options: Option[];
  errorMessage?: string;
};

export const RHFSelect = forwardRef(<T extends FieldValues>(
  { name, label, control, options, errorMessage }: RHFSelectProps<T>,
  _ref: Ref<any>
) => {
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
          </FormControl>
        );
      }}
    />
  );
});

RHFSelect.displayName = 'RHFSelect';
