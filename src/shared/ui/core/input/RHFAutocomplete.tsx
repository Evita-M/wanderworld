import { Autocomplete, Box, Checkbox, Stack, TextField, Typography } from '@mui/material';
import { Controller, FieldValues, Path } from 'react-hook-form';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { forwardRef, Ref } from 'react';
import { Option } from '@/shared/types';

type RHFAutocompleteProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: any;
  options: Option[];
  errorMessage?: string;
  multiple?: boolean;
};

export const RHFAutocomplete = forwardRef(<T extends FieldValues>(
  { name, label, control, options, errorMessage, multiple = true }: RHFAutocompleteProps<T>,
  _ref: Ref<any>
) => {
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
              {option.label}
            </Box>
          )}
        />
      )}
    />
  );
});
