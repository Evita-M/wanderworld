import {
  Container,
  FormHelperText,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { forwardRef, Ref } from 'react';

type RHFSliderProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: any;
  limit: number[];
  errorMessage?: string;
};

export const RHFSlider = forwardRef(<T extends FieldValues>(
  { name, label, control, limit, errorMessage }: RHFSliderProps<T>,
  _ref: Ref<any>
) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Stack position='relative' height='100%' justifyContent='flex-end'>
          <Typography variant='caption' position='absolute' top='-1rem'>
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
          {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
        </Stack>
      )}
    />
  );
});
