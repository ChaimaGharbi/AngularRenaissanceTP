import { Component, computed, model } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-ttc",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./ttc.component.html",
  styleUrl: "./ttc.component.css",
})
export class TtcComponent {
  price = model(0);
  quantity = model(1);
  vat = model(18);

  discount = computed(() => {
    if (this.quantity() > 15) {
      return 30;
    }

    if (this.quantity() > 10) {
      return 20;
    }

    return 0;
  });

  unitPrice = computed(() => this.price() * (1 + this.vat() / 100));
  total = computed(() => this.unitPrice() * this.quantity());
  discountValue = computed(() => this.total() * (this.discount() / 100));

  formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  unitPriceString = computed(() =>
    this.formatter.format(this.unitPrice() * (1 - this.discount() / 100))
  );
  totalString = computed(() =>
    this.formatter.format(this.total() - this.discountValue())
  );
  discountString = computed(() => this.formatter.format(this.discountValue()));
}
