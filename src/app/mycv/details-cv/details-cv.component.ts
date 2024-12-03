import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
import { DefaultImagePipe } from '../../cv/pipes/default-image.pipe';
import { AuthService } from '../../auth/services/auth.service';
import { CvService } from '../../cv/services/cv.service';
import { APP_ROUTES } from 'src/config/routes.config';
import { Cv } from '../../cv/model/cv';
import { catchError, EMPTY, map, Observable, switchMap } from 'rxjs';


@Component({
    selector: 'app-details2-cv',
    templateUrl: './details-cv.component.html',
    styleUrls: ['./details-cv.component.css'],
})
export class DetailsCv2Component {
  private cvService = inject(CvService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private toastr = inject(ToastrService);
  authService = inject(AuthService);


  cv$ = this.activatedRoute.params.pipe(
    switchMap(({id}) => this.cvService.getCvById(+id)),
    catchError((e) => {
      this.router.navigate([APP_ROUTES.cv]);
      return EMPTY;
    }
  )
  );

  
  deleteCv(cv: Cv | null) {
  if(cv)
  this.cvService.deleteCvById(cv.id).subscribe({
    next: () => {
      this.toastr.success(`${cv.name} supprimé avec succès`);
      this.router.navigate([APP_ROUTES.cv]);
    },
    error: () => {
      this.toastr.error(
        `Problème avec le serveur veuillez contacter l'admin`
      );
    },
  });

  }
}
