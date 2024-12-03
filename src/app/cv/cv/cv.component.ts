import { Component } from "@angular/core";
import { Cv } from "../model/cv";
import { LoggerService } from "../../services/logger.service";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import { CvCardComponent } from "../cv-card/cv-card.component";
import { EmbaucheComponent } from "../embauche/embauche.component";
import { UpperCasePipe, DatePipe } from "@angular/common";
import { ListComponent } from "../list/list.component";
import { catchError, Observable, of } from "rxjs";
import { Router } from "@angular/router";
@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
})
export class CvComponent {
  cvs$: Observable <Cv[]>; 
  selectedCv$: Observable <Cv | null>;
  juniorCvs: Cv[] = [];
  seniorCvs: Cv[] = [];
  date = new Date();
  type: string = "juniors";

  constructor(
    private logger: LoggerService,
    private toastr: ToastrService,
    private cvService: CvService,
    private router: Router,
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

    this.cvs$.subscribe(cvs => {
      cvs.forEach(cv => {
        if (cv.age < 40) {
          this.juniorCvs.push(cv);
        } else {
          this.seniorCvs.push(cv);
        }
      });
    });

  this.router.events.subscribe(() => {
    const newType = this.router.getCurrentNavigation()?.extras?.state?.['type'];
    if (newType) {
    this.type = newType;
    }
  });
  }

  getToJuniors() {
  this.router.navigate(['cv'], { 
    state: { type: 'juniors' }
  });
  }

  getToSeniors() {
  this.router.navigate(['cv'], { 
    state: { type: 'seniors' }
  });
  }
}