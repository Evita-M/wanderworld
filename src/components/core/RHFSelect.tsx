import { InputLabel, MenuItem, Select } from '@mui/material';
import { Controller, FieldValues, Path } from 'react-hook-form';

import { Option } from '@/type/option';

type RHFSelectProps<T extends FieldValues> = {
  name: Path<T>;
  options: Option[];
  label: string;
  control: any;
};

export function RHFSelect<T extends FieldValues>({
  name,
  options,
  label,
  control,
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
            {...field} // Spread field props here
            id={name} // Provide the id here for the Select component
          >
            {options.map((option) => (
              <MenuItem value={option.id} key={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
    />
  );
}
