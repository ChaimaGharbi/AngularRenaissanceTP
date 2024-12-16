import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../users.service';

export const fibonnaci = (n: number): number => {
  if (n==1 || n==0) {
    return 1;
  }
  return fibonnaci(n-1) + fibonnaci(n-2);
}

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserItemComponent {
  @Input() user: User | null = null;

  fibo(n: number): number {
    const fib = fibonnaci(n);
    console.log({n, fib});

    return fib;
  }
}
