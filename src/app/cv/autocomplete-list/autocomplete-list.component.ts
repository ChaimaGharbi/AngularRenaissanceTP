import { Component, Input } from "@angular/core";
import { Cv } from "../model/cv";

@Component({
  selector: 'app-autocomplete-list',
  templateUrl: './autocomplete-list.component.html',
  styleUrl: './autocomplete-list.component.css'
})
export class AutocompleteListComponent {
  @Input() cvs: Cv[] | null = [];
}
