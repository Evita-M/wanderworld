import { Container, Slider, Stack, Typography } from '@mui/material';
import { Controller, FieldValues, Path } from 'react-hook-form';

type RHFSliderProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: any;
  limit: number[];
};

export function RHFSlider<T extends FieldValues>({
  name,
  label,
  control,
  limit,
}: RHFSliderProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Stack>
          <Typography fontSize='22px' mb='24px'>
            {label}
          </Typography>
          <Container>
            <Slider
              min={limit[0]}
              max={limit[1]}
              {...field}
              valueLabelDisplay='auto'
            />
          </Container>
        </Stack>
      )}
    />
  );
}
