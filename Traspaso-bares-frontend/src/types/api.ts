export type ApiError = {
  status: number | null;
  code: string;
  message: string;
  fields?: any;
};
