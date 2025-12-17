import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from '../../../../shared/services/categories.service';
import { CategoryReadDtoPaginatedResultDto } from '../../../../shared/interfaces/category-dto';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  categoriesResult$: Observable<CategoryReadDtoPaginatedResultDto>;
  page = 1;
  pageSize = 10;

  constructor(private categoriesService: CategoriesService) {
    this.categoriesResult$ = this.categoriesService.getPage(this.page, this.pageSize);
  }
}
