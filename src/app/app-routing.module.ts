import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (moduleRef) => moduleRef.DashboardModule
      ),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./features/categories/categories.module').then(
        (moduleRef) => moduleRef.CategoriesModule
      ),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/products.module').then(
        (moduleRef) => moduleRef.ProductsModule
      ),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
