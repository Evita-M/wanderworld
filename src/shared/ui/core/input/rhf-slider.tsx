import {
  Container,
  FormHelperText,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface RHFSliderProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  limit: [number, number];
  errorMessage?: string;
}

export const RHFSlider = <T extends FieldValues>({
  name,
  control,
  ...props
}: RHFSliderProps<T>) => {
  return (
    <Stack position='relative' height='100%' justifyContent='flex-end'>
      <Typography variant='caption' position='absolute' top='-1rem'>
        {props.label}
      </Typography>
      <Container>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Slider
              min={props.limit[0]}
              max={props.limit[1]}
              {...field}
              valueLabelDisplay='auto'
            />
          )}
        />
      </Container>
      {props.errorMessage && (
        <FormHelperText>{props.errorMessage}</FormHelperText>
      )}
    </Stack>
  );
};
