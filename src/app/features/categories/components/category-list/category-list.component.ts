import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../../../shared/services/categories.service';
import {
  CategoryCreateUpdateDto,
  CategoryReadDto,
  CategoryReadDtoPaginatedResultDto,
} from '../../../../shared/interfaces/category-dto';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
  categoriesResult: CategoryReadDtoPaginatedResultDto | null = null;
  page = 1;
  pageSize = 10;
  form: FormGroup;
  editingCategoryId: number | null = null;

  constructor(
    private categoriesService: CategoriesService,
    formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
    });
    this.loadPage();
  }

  loadPage(): void {
    this.categoriesService
      .getPage(this.page, this.pageSize)
      .subscribe((result) => {
        this.categoriesResult = result;
      });
  }

  selectForEdit(category: CategoryReadDto): void {
    this.editingCategoryId = category.id;
    this.form.setValue({
      name: category.name ?? '',
    });
  }

  resetForm(): void {
    this.editingCategoryId = null;
    this.form.reset();
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload: CategoryCreateUpdateDto = {
      name: this.form.value.name,
    };
    if (this.editingCategoryId === null) {
      this.categoriesService.create(payload).subscribe(() => {
        this.loadPage();
        this.resetForm();
      });
      return;
    }
    this.categoriesService
      .update(this.editingCategoryId, payload)
      .subscribe(() => {
        this.loadPage();
        this.resetForm();
      });
  }

  delete(categoryId: number): void {
    this.categoriesService.delete(categoryId).subscribe(() => {
      this.loadPage();
      if (this.editingCategoryId === categoryId) {
        this.resetForm();
      }
    });
  }
}
