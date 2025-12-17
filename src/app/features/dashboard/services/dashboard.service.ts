import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { DashboardOverview } from '../interfaces/dashboard-overview';
import { CategoriesService } from '../../../shared/services/categories.service';
import { ProductsService } from '../../../shared/services/products.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private categoriesService: CategoriesService, private productsService: ProductsService) {}

  getOverview(): Observable<DashboardOverview> {
    const categoriesRequest = this.categoriesService.getPage(1, 1);
    const productsRequest = this.productsService.getPage(1, 1);
    return forkJoin([categoriesRequest, productsRequest]).pipe(
      map(([categoriesResult, productsResult]) => ({
        categoryCount: categoriesResult.totalCount,
        productCount: productsResult.totalCount
      }))
    );
  }
}


