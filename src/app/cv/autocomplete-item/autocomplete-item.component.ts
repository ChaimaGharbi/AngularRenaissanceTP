import { Component, Input } from "@angular/core";
import { Cv } from "../model/cv";
import { APP_ROUTES } from "../../../config/routes.config";

@Component({
  selector: "app-autocomplete-item",
  templateUrl: "./autocomplete-item.component.html",
  styleUrl: "./autocomplete-item.component.css",
})
export class AutocompleteItemComponent {
  @Input({ required: true })
  cv!: Cv;

  @Input()
  size = 50;

  cvRoute = `/${APP_ROUTES.cv}`;
}
