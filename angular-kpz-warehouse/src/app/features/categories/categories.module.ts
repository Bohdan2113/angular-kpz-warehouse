import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CategoryListComponent],
  imports: [CommonModule, CategoriesRoutingModule, SharedModule],
})
export class CategoriesModule {}
