import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import {
  CategoryCreateUpdateDto,
  CategoryReadDto,
  CategoryReadDtoPaginatedResultDto,
} from '../interfaces/category-dto';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private apiService: ApiService) {}

  getPage(
    page: number,
    pageSize: number
  ): Observable<CategoryReadDtoPaginatedResultDto> {
    const url = `/api/Categories?page=${page}&pageSize=${pageSize}`;
    return this.apiService.get<CategoryReadDtoPaginatedResultDto>(url);
  }

  getAll(): Observable<CategoryReadDto[]> {
    return this.getPage(1, 100).pipe(
      map((result) => {
        const data = result.data;
        if (!data) {
          return [];
        }
        return data;
      })
    );
  }

  getById(id: number): Observable<CategoryReadDto> {
    const url = `/api/Categories/${id}`;
    return this.apiService.get<CategoryReadDto>(url);
  }

  create(payload: CategoryCreateUpdateDto): Observable<CategoryReadDto> {
    const url = '/api/Categories';
    return this.apiService.post<CategoryCreateUpdateDto, CategoryReadDto>(
      url,
      payload
    );
  }

  update(
    id: number,
    payload: CategoryCreateUpdateDto
  ): Observable<CategoryReadDto> {
    const url = `/api/Categories/${id}`;
    return this.apiService.put<CategoryCreateUpdateDto, CategoryReadDto>(
      url,
      payload
    );
  }

  delete(id: number): Observable<unknown> {
    const url = `/api/Categories/${id}`;
    return this.apiService.delete<unknown>(url);
  }
}
