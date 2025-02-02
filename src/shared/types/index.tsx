export interface Option  {
  id: string;
  label: string;
};

export interface ApiResponse<T> {
  data: T;
  error?: string;
}
