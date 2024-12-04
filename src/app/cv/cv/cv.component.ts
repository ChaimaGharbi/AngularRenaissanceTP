import { Component } from "@angular/core";
import { Cv } from "../model/cv";
import { LoggerService } from "../../services/logger.service";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
})
export class CvComponent {
  cvs: Cv[] = [];
  juniorCvs: Cv[] = [];
  seniorCvs: Cv[] = [];

  type: string = "juniors";

  selectedCv$: Observable<Cv | null>;

  date = new Date();

  constructor(
    private logger: LoggerService,
    private toastr: ToastrService,
    private cvService: CvService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.cvs = this.activatedRoute.snapshot.data["cvs"];
    this.selectedCv$ = this.cvService.selectCv$;

    this.cvs.forEach((cv) => {
      if (cv.age < 40) {
        this.juniorCvs.push(cv);
      } else {
        this.seniorCvs.push(cv);
      }
    });

    this.router.events.pipe(
      takeUntilDestroyed(),
    ).subscribe(() => {
      const newType = this.router.getCurrentNavigation()?.extras?.state
        ?.["type"];
      if (newType) {
        this.type = newType;
      }
    });

    this.logger.logger("je suis le cvComponent");
    this.toastr.info("Bienvenu dans notre CvTech");
  }

  getToJuniors() {
    this.router.navigate(["cv"], {
      state: { type: "juniors" },
    });
  }

  getToSeniors() {
    this.router.navigate(["cv"], {
      state: { type: "seniors" },
    });
  }
}
