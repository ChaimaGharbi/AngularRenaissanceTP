import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { CvService } from "../services/cv.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { APP_ROUTES } from "src/config/routes.config";
import { Cv } from "../model/cv";
import { cinExistsValidator } from "./cin-exists.validator";
import { filter, map, startWith } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { STORAGE_KEY_NAMES } from "src/config/storage.config";

@Component({
  selector: "app-add-cv",
  templateUrl: "./add-cv.component.html",
  styleUrls: ["./add-cv.component.css"],
})
export class AddCvComponent {
  constructor(
    private cvService: CvService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) {
    const savedData = localStorage.getItem(STORAGE_KEY_NAMES.addCvForm);
    if (savedData) {
      this.form.patchValue(JSON.parse(savedData));
    }

    this.age.valueChanges.pipe(
      startWith(this.age.value),
      map((value) => {
        const age = Number(value);

        if (!Number.isInteger(age) || age < 0) {
          return 0;
        }

        return age;
      }),
      takeUntilDestroyed(),
    ).subscribe((age) => {
      if (age < 18) {
        return void this.path?.disable();
      }

      this.path?.enable();
    });

    this.form.statusChanges
      .pipe(
        filter((status) => status === "VALID"),
        takeUntilDestroyed(),
      )
      .subscribe(() =>
        localStorage.setItem(
          STORAGE_KEY_NAMES.addCvForm,
          JSON.stringify(this.form.value),
        )
      );
  }

  form = this.formBuilder.group(
    {
      name: ["", Validators.required],
      firstname: ["", Validators.required],
      path: [""],
      job: ["", Validators.required],
      cin: [
        "",
        {
          validators: [Validators.required, Validators.pattern("[0-9]{8}")],
          asyncValidators: cinExistsValidator(this.cvService),
        },
      ],
      age: [
        0,
        {
          validators: [Validators.required],
        },
      ],
    },
  );

  addCv() {
    this.cvService.addCv(this.form.value as Cv).subscribe({
      next: (cv) => {
        localStorage.removeItem(STORAGE_KEY_NAMES.addCvForm);

        this.router.navigate([APP_ROUTES.cv]);
        this.toastr.success(`Le cv ${cv.firstname} ${cv.name}`);
      },
      error: (err) => {
        this.toastr.error(
          `Une erreur s'est produite, Veuillez contacter l'admin`,
        );
      },
    });
  }

  get name(): AbstractControl {
    return this.form.get("name")!;
  }

  get firstname() {
    return this.form.get("firstname");
  }

  get age(): AbstractControl {
    return this.form.get("age")!;
  }

  get job() {
    return this.form.get("job");
  }

  get path() {
    return this.form.get("path");
  }

  get cin(): AbstractControl {
    return this.form.get("cin")!;
  }
}
