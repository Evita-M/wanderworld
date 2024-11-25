import { Autocomplete, Box, Checkbox, TextField } from '@mui/material';
import { Controller, FieldValues, Path } from 'react-hook-form';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Option } from '@/type/option';

type RHFAutocompleteProps<T extends FieldValues> = {
  name: Path<T>;
  options: Option[];
  label: string;
  control: any;
};

export function RHFAutocomplete<T extends FieldValues>({
  name,
  options,
  label,
  control,
}: RHFAutocompleteProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value = [], onChange, ref },
        fieldState: { error },
      }) => (
        <Autocomplete
          options={options || []}
          getOptionLabel={(option: Option) =>
            options.find((item) => item.id === option.id)?.label ?? ''
          }
          value={value
            .map((id: string) => options?.find((item) => item.id === id))
            .filter((option): option is Option => option !== undefined)}
          onChange={(_, newValue) => {
            onChange(newValue.map((item) => item.id));
          }}
          isOptionEqualToValue={(option, newValue) => option.id === newValue.id}
          disableCloseOnSelect
          multiple
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              inputRef={ref}
              error={!!error}
              helperText={error?.message}
              label={label}
            />
          )}
          renderOption={(props, option, { selected }) => (
            <Box component='li' {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlankOutlinedIcon />}
                checkedIcon={<CheckBoxIcon />}
                checked={selected}
              />
              {option.label}
            </Box>
          )}
        />
      )}
    />
  );
}
