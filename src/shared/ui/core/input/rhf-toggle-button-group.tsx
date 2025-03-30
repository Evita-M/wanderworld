import { Option } from '@/shared/types/option';
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

type RHFToggleButtonGroupProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  options?: Option[];
};

export function RHFToggleButtonGroup<T extends FieldValues>({
  label,
  name,
  options,
}: RHFToggleButtonGroupProps<T>) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...restField } }) => (
        <Stack>
          <Typography fontSize='22px' mb='24px'>
            {label}
          </Typography>
          <ToggleButtonGroup
            onChange={(_, newValue) => {
              if (newValue.length) {
                onChange(newValue);
              }
            }}
            value={value.length ? value : [options?.[0].code]}
            {...restField}
          >
            {options?.map((option) => (
              <ToggleButton value={option.code} key={option.code}>
                {option.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Stack>
      )}
    ></Controller>
  );
}
