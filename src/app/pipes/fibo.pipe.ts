import { Pipe, PipeTransform } from "@angular/core";
import memo from "memo-decorator";

@Pipe({
  name: "fibo",
})
export class FiboPipe implements PipeTransform {
  @memo()
  fibonnaci(n: number): number {
    if (n < 2) {
      return 1;
    }

    return this.fibonnaci(n - 1) + this.fibonnaci(n - 2);
  }

  transform(n: number): number {
    const fib = this.fibonnaci(n);
    console.log({ n, fib });

    return fib;
  }
}
