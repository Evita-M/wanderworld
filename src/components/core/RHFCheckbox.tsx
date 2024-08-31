import { Option } from '@/type/option';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

type RHFCheckboxProps<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label?: string;
};

export function RHFCheckbox<T extends FieldValues>({
  name,
  options,
  label,
}: RHFCheckboxProps<T>) {
  const { control } = useFormContext<T>();
  return (
    <Stack>
      {label && (
        <Typography fontSize='22px' mb='24px'>
          {label}
        </Typography>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <FormControl error={!!error}>
            <FormGroup>
              <Grid container spacing={2} columns={16} padding='0 24px'>
                {options?.map((option) => (
                  <Grid xs={8} key={option.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={value.includes(option.id)}
                          onChange={() => {
                            if (value.includes(option.id)) {
                              onChange(
                                (value as string[]).filter(
                                  (item) => item !== option.label
                                )
                              );
                            } else {
                              onChange([...value, option.id]);
                            }
                          }}
                          key={option.id}
                        />
                      }
                      label={option.label}
                      key={option.id}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>
            <FormHelperText>{error?.message}</FormHelperText>
          </FormControl>
        )}
      />
    </Stack>
  );
}
