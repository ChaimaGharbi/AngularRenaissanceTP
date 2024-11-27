import { Component, OnInit, inject } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  scan,
  switchMap,
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
  /* Todo : Faire le nécessaire pour créer le flux des produits à afficher */
  /* Tips : vous pouvez voir les différents imports non utilisés et vous en inspirer */
  private productService = inject(ProductService);
  products$!: Observable<Product[]>;
  settings$ = new BehaviorSubject<Settings>({ limit: 12, skip: 0 });

  constructor() { }
  ngOnInit() {
    this.products$ = this.settings$.pipe(
      switchMap((settings) => this.productService.getProducts(settings)),
      scan((acc: Product[], value: ProductApiResponse) => {
        return [...acc, ...value.products];
      }, [])
    );
  }

  loadMoreProducts() {
    this.settings$.next({
      ...this.settings$.value,
      skip: this.settings$.value.skip + this.settings$.value.limit, // Mise à jour du paramètre `skip`
    });
  }
}
