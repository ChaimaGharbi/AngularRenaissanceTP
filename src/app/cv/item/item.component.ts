import { Component, Input, Output, EventEmitter, inject, input } from "@angular/core";
import { Cv } from "../model/cv";
import { CvService } from "../services/cv.service";
import { NgStyle } from "@angular/common";
import { DefaultImagePipe } from "../pipes/default-image.pipe";

@Component({
    selector: "app-item",
    templateUrl: "./item.component.html",
    styleUrls: ["./item.component.css"],
    standalone: true,
    imports: [NgStyle, DefaultImagePipe],
})
export class ItemComponent {
  private cvService = inject(CvService);

  cv = input.required<Cv>();
  size = input<number>(5);

  onSelectCv() {
    this.cvService.selectCv(this.cv());
  }
}
