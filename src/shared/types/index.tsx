export type Create = {
  variant: 'create';
};

export type Edit = {
  variant: 'edit';
  id: string;
};

export type Option = {
  id: string;
  label: string;
};
