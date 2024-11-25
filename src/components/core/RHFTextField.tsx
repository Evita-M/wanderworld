import { TextField, TextFieldProps } from '@mui/material';
import React, { forwardRef, Ref } from 'react';
import { FieldValues, Path } from 'react-hook-form';

interface RHFTextFieldProps<T extends FieldValues>
  extends Omit<TextFieldProps, 'name'> {
  name: Path<T>;
  errorMessage?: string;
  inputRef?: Ref<HTMLInputElement>;
}

const RHFTextField = <T extends FieldValues>(
  { name, errorMessage, inputRef, ...props }: RHFTextFieldProps<T>,
  ref: Ref<HTMLInputElement>
) => {
  return (
    <TextField
      name={name}
      inputRef={inputRef || ref}
      error={!!errorMessage}
      helperText={errorMessage}
      {...props}
    />
  );
};

RHFTextField.displayName = 'RHFTextField';

export default forwardRef(RHFTextField) as <T extends FieldValues>(
  props: RHFTextFieldProps<T> & { ref?: Ref<HTMLInputElement> }
) => JSX.Element;
