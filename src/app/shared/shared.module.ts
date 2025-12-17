import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehousePipe } from './pipes/warehouse.pipe';
import { WarehouseHighlightDirective } from './directives/warehouse-highlight.directive';

@NgModule({
  declarations: [WarehousePipe, WarehouseHighlightDirective],
  imports: [CommonModule],
  exports: [WarehousePipe, WarehouseHighlightDirective],
})
export class SharedModule {}
