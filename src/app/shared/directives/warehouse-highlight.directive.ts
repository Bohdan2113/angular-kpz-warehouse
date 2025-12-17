import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appWarehouseHighlight]',
})
export class WarehouseHighlightDirective {
  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  handleMouseEnter(): void {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'backgroundColor',
      'rgba(56,189,248,0.06)'
    );
  }

  @HostListener('mouseleave')
  handleMouseLeave(): void {
    this.renderer.removeStyle(this.elementRef.nativeElement, 'backgroundColor');
  }
}
