import { Component } from "@angular/core";
import { Cv } from "../model/cv";
import { LoggerService } from "../../services/logger.service";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { catchError, Observable, of } from "rxjs";
@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
})
export class CvComponent {
  cvs$: Observable <Cv[]>; 
  selectedCv$: Observable <Cv | null>;
  date = new Date();
  type: string = "juniors";

  constructor(
    private logger: LoggerService,
    private toastr: ToastrService,
    private cvService: CvService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.cvs$ = this.cvService.getCvs().pipe(
      catchError(() => {
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
        return of(this.cvService.getFakeCvs());;
      })
    );

    // Observable pour le CV sélectionné
    this.selectedCv$ = this.cvService.selectCv$;

    // Logs et notifications
    this.logger.logger("je suis le cvComponent");
    this.toastr.info("Bienvenu dans notre CvTech");
  }

  getToJuniors(){
    this.router.navigate(["cv", { type: "juniors" }]);
  }

  getToSeniors(){
    this.router.navigate(["cv" , { type: "seniors" }]);
  }
}
