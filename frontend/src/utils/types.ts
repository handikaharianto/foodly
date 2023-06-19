export type ErrorResponse = {
  error: string;
};

export type PaginatedData<T> = {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalData: number;
};
