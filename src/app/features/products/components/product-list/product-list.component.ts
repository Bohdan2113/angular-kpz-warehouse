import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../../../shared/services/categories.service';
import { ProductsService } from '../../../../shared/services/products.service';
import { CategoryReadDto } from '../../../../shared/interfaces/category-dto';
import {
  ProductCreateDto,
  ProductReadDtoPaginatedResultDto,
  ProductUpdateDto,
} from '../../../../shared/interfaces/product-dto';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  productsResult: ProductReadDtoPaginatedResultDto | null = null;
  categories: CategoryReadDto[] = [];
  page = 1;
  pageSize = 10;
  filterCategoryId: number | null = null;
  form: FormGroup;
  editingProductId: number | null = null;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(150),
        ],
      ],
      categoryId: [null, Validators.required],
    });
    this.loadCategories();
    this.loadPage();
  }

  loadCategories(): void {
    this.categoriesService.getAll().subscribe((result) => {
      this.categories = result;
    });
  }

  loadPage(): void {
    if (this.filterCategoryId === null) {
      this.productsService
        .getPage(this.page, this.pageSize)
        .subscribe((result) => {
          this.productsResult = result;
          this.page = result.currentPage;
          this.pageSize = result.pageSize;
        });
      return;
    }
    this.productsService
      .getByCategory(this.filterCategoryId, this.page, this.pageSize)
      .subscribe((result) => {
        this.productsResult = result;
        this.page = result.currentPage;
        this.pageSize = result.pageSize;
      });
  }

  changeFilter(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    const value = target ? target.value : '';
    if (!value) {
      this.filterCategoryId = null;
      this.loadPage();
      return;
    }
    this.filterCategoryId = Number(value);
    this.loadPage();
  }

  changePage(page: number): void {
    if (!this.productsResult) {
      return;
    }
    if (page < 1 || page > this.productsResult.totalPages) {
      return;
    }
    this.page = page;
    this.loadPage();
  }

  nextPage(): void {
    if (!this.productsResult) {
      return;
    }
    if (!this.productsResult.hasNextPage) {
      return;
    }
    this.changePage(this.productsResult.currentPage + 1);
  }

  previousPage(): void {
    if (!this.productsResult) {
      return;
    }
    if (!this.productsResult.hasPreviousPage) {
      return;
    }
    this.changePage(this.productsResult.currentPage - 1);
  }

  formatDate(value: unknown): string {
    if (!value) {
      return '';
    }
    if (
      typeof value === 'string' ||
      value instanceof Date ||
      typeof value === 'number'
    ) {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return '';
      }
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${day}.${month}.${year}`;
    }
    const dateOnly = value as { year: number; month: number; day: number };
    if (
      typeof dateOnly.year === 'number' &&
      typeof dateOnly.month === 'number' &&
      typeof dateOnly.day === 'number'
    ) {
      const month = dateOnly.month.toString().padStart(2, '0');
      const day = dateOnly.day.toString().padStart(2, '0');
      return `${day}.${month}.${dateOnly.year}`;
    }
    return '';
  }

  selectForEdit(
    productId: number,
    name: string | null,
    categoryId: number
  ): void {
    this.editingProductId = productId;
    this.form.setValue({
      name: name ?? '',
      categoryId,
    });
  }

  resetForm(): void {
    this.editingProductId = null;
    this.form.reset();
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const nameValue: string = this.form.value.name;
    const categoryIdValue: number = this.form.value.categoryId;
    if (this.editingProductId === null) {
      const payload: ProductCreateDto = {
        name: nameValue,
        categoryId: categoryIdValue,
      };
      this.productsService.create(payload).subscribe(() => {
        this.loadPage();
        this.resetForm();
      });
      return;
    }
    const payload: ProductUpdateDto = {
      name: nameValue,
      categoryId: categoryIdValue,
    };
    this.productsService
      .update(this.editingProductId, payload)
      .subscribe(() => {
        this.loadPage();
        this.resetForm();
      });
  }

  delete(productId: number): void {
    this.productsService.delete(productId).subscribe(() => {
      this.loadPage();
      if (this.editingProductId === productId) {
        this.resetForm();
      }
    });
  }
}
