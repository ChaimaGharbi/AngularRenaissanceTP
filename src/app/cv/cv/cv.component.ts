import { Component } from "@angular/core";
import { Cv } from "../model/cv";
import { LoggerService } from "../../services/logger.service";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
})
export class CvComponent {
  cvs: Cv[] = [];
  juniorCvs: Cv[] = [];
  seniorCvs: Cv[] = [];
  selectedCv: Cv | null = null;
  /*   selectedCv: Cv | null = null; */
  date = new Date();
  type: string = "juniors";

  constructor(
    private logger: LoggerService,
    private toastr: ToastrService,
    private cvService: CvService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.type = this.activatedRoute.snapshot.paramMap.get("type") || this.type; 

    this.activatedRoute.params.subscribe(params => {
      this.type = params['type'] || this.type;
      console.log('Updated type:', this.type);
    });

    this.cvService.getCvs().subscribe({
      next: (cvs) => {
        this.cvs = cvs;
        this.juniorCvs = [];
        this.seniorCvs = [];
        cvs.forEach(cv => {
          if (cv.age < 40) {
            this.juniorCvs.push(cv);
          } else {
            this.seniorCvs.push(cv);
          }
        });
      },
      error: () => {
        this.cvs = this.cvService.getFakeCvs();
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
      },
    });
    this.logger.logger("je suis le cvComponent");
    this.toastr.info("Bienvenu dans notre CvTech");
    this.cvService.selectCv$.subscribe((cv) => (this.selectedCv = cv));
  }

  getToJuniors(){
    this.router.navigate(["cv", { type: "juniors" }]);
  }

  getToSeniors(){
    this.router.navigate(["cv" , { type: "seniors" }]);
  }
}
