import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { CvService } from "../services/cv.service";
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export function CinExistsValidator(cvservice: CvService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    console.log(control.value);
    if (!control.value) {
      return of(null); 
    }
    
    return cvservice.selectByProperty("cin",control.value).pipe(
      map((cv) => {
        console.log(cv);
        
        return cv.length!=0 ? { cinExists: true } : null;
      }),
      catchError(() => {
        return of(null);
  }));
}
}
