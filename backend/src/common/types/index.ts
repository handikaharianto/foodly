export type PaginatedData<T> = {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalData: number;
};
