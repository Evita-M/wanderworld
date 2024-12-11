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

import { Controller, FieldValues, Path } from 'react-hook-form';

type RHFCheckboxProps<T extends FieldValues> = {
  name: Path<T>;
  control: any;
  options?: Option[];
  label?: string;
  errorMessage?: string;
};

export function RHFCheckbox<T extends FieldValues>({
  name,
  control,
  options,
  label,
  errorMessage,
}: RHFCheckboxProps<T>) {
  console.log(options);
  return (
    <Stack>
      {label && (
        <Typography fontSize='22px' mb='24px'>
          {label}
        </Typography>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <FormControl error={!!error}>
            <FormGroup>
              <Grid container spacing={2} columns={16} padding='0 24px'>
                {options?.map((option) => (
                  <Grid xs={8} key={option.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={value?.includes(option.id)}
                          onChange={() => {
                            if (value?.includes(option.id)) {
                              onChange(
                                (value as string[]).filter(
                                  (item) => item !== option.id
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
            {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
          </FormControl>
        )}
      />
    </Stack>
  );
}
