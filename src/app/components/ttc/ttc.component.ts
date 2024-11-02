import { Component } from '@angular/core';

@Component({
  selector: 'app-ttc',
  templateUrl: './ttc.component.html',
  styleUrl: './ttc.component.css',
})
export class TtcComponent {
  quantity: number = 1;
  price: number = 0;
  tva: number = 18;
  totalPrice: number = 0;
  unitPriceTTC: number = 0;
  discount = 0;

  calculatePrices() {
    let priceBeforeTax = this.price * this.quantity;

    if (this.quantity >= 10 && this.quantity <= 15) {
      this.discount = 0.2;
    } else if (this.quantity > 15) {
      this.discount = 0.3;
    } else {
      this.discount = 0;
    }

    priceBeforeTax -= priceBeforeTax * this.discount;

    this.unitPriceTTC = (priceBeforeTax / this.quantity) * (1 + this.tva / 100);

    this.totalPrice = priceBeforeTax * (1 + this.tva / 100);
  }
}
