import React, { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Slider } from '@mui/material';

const RHFSlider = forwardRef<HTMLDivElement, RHFSliderProps>(
  ({ name, ...other }, ref) => {
    const { control } = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Slider
            {...field}
            ref={ref}
            {...other}
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
    );
  }
);

RHFSlider.displayName = 'RHFSlider';

export default RHFSlider;
