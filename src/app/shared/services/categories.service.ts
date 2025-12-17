import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { CategoryReadDtoPaginatedResultDto } from '../interfaces/category-dto';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private apiService: ApiService) {}

  getPage(page: number, pageSize: number): Observable<CategoryReadDtoPaginatedResultDto> {
    const url = `assets/mocks/categories.json?page=${page}&pageSize=${pageSize}`;
    return this.apiService.get<CategoryReadDtoPaginatedResultDto>(url);
  }
}


