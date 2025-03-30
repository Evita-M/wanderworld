import { Option } from '@/shared/types/option';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { Controller, FieldValues, Path } from 'react-hook-form';

type RHFRadioButtonGroupProps<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
  control: any;
};

export function RHFRadioButtonGroup<T extends FieldValues>({
  name,
  options,
  label,
  control,
}: RHFRadioButtonGroupProps<T>) {
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
        render={({ field, fieldState: { error } }) => (
          <FormControl {...field} error={!!error}>
            <RadioGroup>
              {options?.map((option) => (
                <FormControlLabel
                  label={option.name}
                  value={option.code}
                  key={option.code}
                  control={<Radio checked={option.code === field.value} />}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
      ></Controller>
    </Stack>
  );
}
