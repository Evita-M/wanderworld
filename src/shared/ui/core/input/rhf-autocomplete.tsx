import { Autocomplete, Box, Checkbox, TextField } from '@mui/material';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Option } from '@/shared/types/option';

interface RHFAutocompleteProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  options: Option[];
  errorMessage?: string;
  multiple?: boolean;
}

export const RHFAutocomplete = <T extends FieldValues>({
  name,
  label,
  control,
  options,
  errorMessage,
}: RHFAutocompleteProps<T>) => {
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
          getOptionLabel={(option: Option) => option.name}
          value={value}
          onChange={(_, newValue) => {
            const selectedLabels = newValue.map((item) => item.name);
            const allMatchingOptions = options.filter((option) =>
              selectedLabels.includes(option.name)
            );
            onChange(allMatchingOptions);
          }}
          isOptionEqualToValue={(option, newValue) =>
            option.code === newValue.code
          }
          disableCloseOnSelect
          multiple
          ListboxProps={{
            style: { maxHeight: '20rem', overflow: 'auto' },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              inputRef={ref}
              error={!!error}
              helperText={errorMessage}
              label={label}
              InputLabelProps={{ shrink: true }}
            />
          )}
          renderOption={(props, option, { selected }) => (
            <Box component='li' {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlankOutlinedIcon />}
                checkedIcon={<CheckBoxIcon />}
                checked={selected}
              />
              {option.name}
            </Box>
          )}
        />
      )}
    />
  );
};
