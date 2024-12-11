import React, { FC } from 'react';
import { Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface ExpeditionActionsProps {
  onEdit: VoidFunction;
  onDelete: VoidFunction;
}

export const ExpeditionActions: FC<ExpeditionActionsProps> = ({
  onEdit,
  onDelete,
}) => {
  return (
    <Stack gap='1.2rem' direction='row'>
      <Button
        onClick={onDelete}
        variant='outlined'
        color='error'
        startIcon={<DeleteIcon />}
        sx={{ minWidth: '15rem' }}
      >
        Delete
      </Button>
      <Button
        onClick={onEdit}
        variant='outlined'
        startIcon={<EditIcon />}
        sx={{ minWidth: '15rem' }}
      >
        Edit
      </Button>
    </Stack>
  );
};
