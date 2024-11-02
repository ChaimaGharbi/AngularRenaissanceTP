import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: 'input[rainbowText]',
})
export class RainbowTextDirective {
  private colors: string[] = [
    '#FF0000',
    '#FF7F00',
    '#FFFF00',
    '#00FF00',
    '#0000FF',
    '#4B0082',
    '#9400D3',
  ];

  @HostBinding('style.color') textColor!: string;
  @HostBinding('style.borderColor') borderColor!: string;

  private getRandomColor(): string {
    const index = Math.floor(Math.random() * this.colors.length);
    return this.colors[index];
  }

  @HostListener('keyup') OnKeyUp() {
    const randomColor = this.getRandomColor();
    this.textColor = randomColor;
    this.borderColor = randomColor;
  }
}
