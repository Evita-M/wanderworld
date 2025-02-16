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
import { Controller, FieldValues, Path, Control } from 'react-hook-form';
import { Option } from '@/shared/types';

interface RHFCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: Option[];
  errorMessage?: string;
}

export const RHFCheckbox = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  errorMessage,
}: RHFCheckboxProps<T>) => {
  const chunkSize = Math.ceil((options?.length || 0) / 3);
  const columns = Array.from({ length: 3 }, (_, i) =>
    (options || []).slice(i * chunkSize, i * chunkSize + chunkSize)
  );

  return (
    <Stack>
      {label && (
        <Typography variant='caption' mb='2.4rem'>
          {label}
        </Typography>
      )}
      <Controller
        name={name}
        control={control}
        render={({
          field: { value = [] as string[], onChange },
          fieldState: { error },
        }) => (
          <FormControl error={!!error}>
            <FormGroup>
              <Grid
                container
                spacing={1}
                alignItems='flex-start'
                justifyContent='flex-start'
              >
                {(options || []).map((option) => (
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    key={option.id}
                    className='flex flex-col'
                  >
                    <FormControlLabel
                      key={option.id}
                      control={
                        <Checkbox
                          checked={value?.includes(option.id)}
                          onChange={() => {
                            if (value?.includes(option.id)) {
                              onChange(
                                value.filter((item) => item !== option.id)
                              );
                            } else {
                              onChange([...value, option.id]);
                            }
                          }}
                        />
                      }
                      label={option.label}
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
};
