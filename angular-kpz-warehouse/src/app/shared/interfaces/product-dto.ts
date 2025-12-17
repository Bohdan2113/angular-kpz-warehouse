import { DateOnly } from './common';
import { PaginatedResult } from './pagination';

export interface ProductCreateDto {
  name: string;
  categoryId: number;
}

export interface ProductUpdateDto {
  name: string | null;
  categoryId: number | null;
}

export interface ProductReadDto {
  id: number;
  name: string | null;
  categoryId: number;
  categoryName: string | null;
  dateAdded: DateOnly;
}

export type ProductReadDtoPaginatedResultDto = PaginatedResult<ProductReadDto>;


