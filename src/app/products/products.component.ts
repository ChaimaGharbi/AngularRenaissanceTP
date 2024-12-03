import { Component, OnInit, inject } from "@angular/core";
import {
  BehaviorSubject,
  concatMap,
  Observable,
  scan,
  takeWhile,
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
    let totalProducts = Infinity; 
  
    this.products$ = this.settings$.pipe(
      concatMap((settings) => this.productService.getProducts(settings)), 
      scan((acc: Product[], value: ProductApiResponse) => {
        const updatedProducts = [...acc, ...value.products];
        totalProducts = value.total;  
        return updatedProducts.length > totalProducts ? updatedProducts.slice(0, totalProducts) : updatedProducts;
      }, []),
      takeWhile((products) => products.length < totalProducts, true) 
    );
  }

  loadMoreProducts() {
    this.settings$.next({
      ...this.settings$.value,
      skip: this.settings$.value.skip + this.settings$.value.limit, 
    });
  }
}
