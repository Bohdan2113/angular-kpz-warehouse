import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { ProductReadDtoPaginatedResultDto } from '../interfaces/product-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private apiService: ApiService) {}

  getPage(page: number, pageSize: number): Observable<ProductReadDtoPaginatedResultDto> {
    const url = `assets/mocks/products.json?page=${page}&pageSize=${pageSize}`;
    return this.apiService.get<ProductReadDtoPaginatedResultDto>(url);
  }
}


