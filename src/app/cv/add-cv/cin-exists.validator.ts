import { AsyncValidatorFn } from "@angular/forms";
import { catchError, map, of, switchMap, timer } from "rxjs";
import { CvService } from "../services/cv.service";
import { Cv } from "../model/cv";

export function cinExistsValidator(cvService: CvService): AsyncValidatorFn {
  return (control) =>
    timer(400)
      .pipe(
        switchMap(() => cvService.selectByProperty("cin", control.value)),
        map((cvs: Cv[]) => cvs.length > 0 ? { cinExists: true } : null),
        catchError(() => of(null)),
      );
}
