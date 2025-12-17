import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../../../../shared/services/products.service';
import { ProductReadDtoPaginatedResultDto } from '../../../../shared/interfaces/product-dto';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  productsResult$: Observable<ProductReadDtoPaginatedResultDto>;
  page = 1;
  pageSize = 10;

  constructor(private productsService: ProductsService) {
    this.productsResult$ = this.productsService.getPage(
      this.page,
      this.pageSize
    );
  }
}
