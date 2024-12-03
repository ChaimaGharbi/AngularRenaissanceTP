import { Component, inject, OnInit } from "@angular/core";
import {
  BehaviorSubject,
  concatMap,
  Observable,
  scan,
  takeWhile,
  tap,
} from "rxjs";
import { Product } from "./dto/product.dto";
import { ProductService } from "./services/product.service";
import { Settings } from "./dto/product-settings.dto";
import { ProductApiResponse } from "./dto/product-api-response.dto";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  products$!: Observable<Product[]>;
  settings$ = new BehaviorSubject<Settings>({ limit: 12, skip: 0 });

  constructor() { }

  ngOnInit() {
    let totalProducts: number;

    this.products$ = this.settings$.pipe(
      concatMap((settings) => this.productService.getProducts(settings)),
      tap((value: ProductApiResponse) => {
        totalProducts = value.total;
      }),
      scan(
        (
          acc: Product[],
          value: ProductApiResponse,
        ) => [...acc, ...value.products],
        [],
      ),
      takeWhile((products) => products.length < totalProducts, true),
    );
  }

  loadMoreProducts() {
    this.settings$.next({
      ...this.settings$.value,
      skip: this.settings$.value.skip + this.settings$.value.limit,
    });
  }
}
