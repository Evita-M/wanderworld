import { FormControlLabel, Switch } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type RHFSwitchProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
};

export function RHFSwitch<T extends FieldValues>({
  name,
  label,
  control,
}: RHFSwitchProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControlLabel
          label={label}
          control={<Switch {...field} checked={field.value} />}
        />
      )}
    />
  );
}
