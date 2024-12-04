import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { catchError, Observable, of } from "rxjs";
import { Cv } from "../model/cv";
import { CvService } from "../services/cv.service";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class CvListResolver implements Resolve<Cv[]> {
  constructor(private cvService: CvService, private toastr: ToastrService) { }

  resolve(): Observable<Cv[]> {
    return this.cvService.getCvs().pipe(
      catchError(() => {
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);

        return of(this.cvService.getFakeCvs());
      }),
    );
  }
}
