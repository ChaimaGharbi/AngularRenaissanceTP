import { Component } from "@angular/core";

import { ToastrService } from "ngx-toastr";
import { catchError, Observable, of } from "rxjs";
import { Cv } from "src/app/cv/model/cv";
import { CvService } from "src/app/cv/services/cv.service";
@Component({
  selector: "app-master-details-cv",
  templateUrl: "./master-details-cv.component.html",
  styleUrls: ["./master-details-cv.component.css"],
})
export class MasterDeatailsCvComponent {
  cvs$: Observable <Cv[]>;

  constructor(
    private toastr: ToastrService,
    private cvService: CvService,
  ) {
    this.cvs$ = this.cvService.getCvs().pipe(
      catchError(() => {
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
        return of(this.cvService.getFakeCvs());;
      })
    );


  }
}