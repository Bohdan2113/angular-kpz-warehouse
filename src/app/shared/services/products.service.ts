import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import {
  ProductCreateDto,
  ProductReadDto,
  ProductReadDtoPaginatedResultDto,
  ProductUpdateDto,
} from '../interfaces/product-dto';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apiService: ApiService) {}

  getPage(page: number, pageSize: number): Observable<ProductReadDtoPaginatedResultDto> {
    const url = `/api/Products?page=${page}&pageSize=${pageSize}`;
    return this.apiService.get<ProductReadDtoPaginatedResultDto>(url);
  }

  getByCategory(
    categoryId: number,
    page: number,
    pageSize: number
  ): Observable<ProductReadDtoPaginatedResultDto> {
    const url = `/api/Products/by-category/${categoryId}?page=${page}&pageSize=${pageSize}`;
    return this.apiService.get<ProductReadDtoPaginatedResultDto>(url);
  }

  getById(id: number): Observable<ProductReadDto> {
    const url = `/api/Products/${id}`;
    return this.apiService.get<ProductReadDto>(url);
  }

  create(payload: ProductCreateDto): Observable<ProductReadDto> {
    const url = '/api/Products';
    return this.apiService.post<ProductCreateDto, ProductReadDto>(url, payload);
  }

  update(id: number, payload: ProductUpdateDto): Observable<ProductReadDto> {
    const url = `/api/Products/${id}`;
    return this.apiService.put<ProductUpdateDto, ProductReadDto>(url, payload);
  }

  delete(id: number): Observable<unknown> {
    const url = `/api/Products/${id}`;
    return this.apiService.delete<unknown>(url);
  }
}