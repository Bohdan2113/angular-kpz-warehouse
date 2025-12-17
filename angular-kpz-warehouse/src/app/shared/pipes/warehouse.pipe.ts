import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'warehouse',
})
export class WarehousePipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) {
      return '';
    }
    return value.trim();
  }
}
