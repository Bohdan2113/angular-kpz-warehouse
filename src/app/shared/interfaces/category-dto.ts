import { PaginatedResult } from './pagination';

export interface CategoryCreateUpdateDto {
  name: string;
}

export interface CategoryReadDto {
  id: number;
  name: string | null;
}

export type CategoryReadDtoPaginatedResultDto = PaginatedResult<CategoryReadDto>;


