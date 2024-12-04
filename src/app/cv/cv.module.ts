import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AddCvComponent } from "./add-cv/add-cv.component";
import { AuthGuard } from "../auth/guards/auth.guard";
import { DetailsCvComponent } from "./details-cv/details-cv.component";
import { CvComponent } from "./cv/cv.component";
import { ListComponent } from "./list/list.component";
import { ItemComponent } from "./item/item.component";
import { CvCardComponent } from "./cv-card/cv-card.component";
import { EmbaucheComponent } from "./embauche/embauche.component";
import { AutocompleteComponent } from "./autocomplete/autocomplete.component";
import { DefaultImagePipe } from "./pipes/default-image.pipe";
import { ReactiveFormsModule } from "@angular/forms";
import { AutocompleteListComponent } from "./autocomplete-list/autocomplete-list.component";
import { AutocompleteItemComponent } from "./autocomplete-item/autocomplete-item.component";
import { MasterDetailsCvComponent } from "../mycv/master-details-cv/master-details-cv.component";
import { List2Component } from "../mycv/list/list.component";
import { DetailsCv2Component } from "../mycv/details-cv/details-cv.component";
import { CvListResolver } from "./cv/resolver";

const routes: Routes = [
  {
    path: "",
    component: CvComponent,
    resolve: {
      cvs: CvListResolver,
    },
  },
  {
    path: "list",
    component: MasterDetailsCvComponent,
    children: [
      {
        path: ":id",
        component: DetailsCv2Component,
      },
    ],
  },
  { path: "add", component: AddCvComponent, canActivate: [AuthGuard] },
  { path: ":id", component: DetailsCvComponent },
];

@NgModule({
  declarations: [
    CvComponent,
    AddCvComponent,
    DetailsCvComponent,
    ListComponent,
    ItemComponent,
    CvCardComponent,
    EmbaucheComponent,
    AutocompleteComponent,
    AutocompleteListComponent,
    AutocompleteItemComponent,
    MasterDetailsCvComponent,
    List2Component,
    DetailsCv2Component,
    DefaultImagePipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
})
export class CvModule { }
