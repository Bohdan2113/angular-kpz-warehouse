export interface PaginatedResult<T> {
  data: T[] | null;
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}


