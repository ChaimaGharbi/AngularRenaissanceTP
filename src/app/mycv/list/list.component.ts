import { Component, Input, Output, EventEmitter, input } from "@angular/core";
import { NgFor, NgClass } from "@angular/common";
import { ItemComponent } from "src/app/cv/item/item.component";
import { Cv } from "src/app/cv/model/cv";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector: "app-list2",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.css"],

})
export class List2Component {
  cvs = input<Cv[] | null>();
}
