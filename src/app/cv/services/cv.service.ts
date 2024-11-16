import { Injectable, inject, signal } from "@angular/core";
import { Cv } from "../model/cv";
import { HttpClient, HttpParams } from "@angular/common/http";
import { API } from "../../../config/api.config";

@Injectable({
  providedIn: "root",
})
export class CvService {
  private http = inject(HttpClient);

  private cvs: Cv[] = [];
  /**
   * Le signal permettant de créer le flux des cvs sélectionnés
   */
  #selectCv = signal<Cv | null>(null);
  selectedCv = this.#selectCv.asReadonly();
  /**
   * Le flux des cvs sélectionnés
   */

  constructor() {
    this.cvs = [
      new Cv(1, "aymen", "sellaouti", "teacher", "as.jpg", "1234", 40),
      new Cv(2, "skander", "sellaouti", "enfant", "       ", "1234", 4),
    ];
  }


  /**
   *
   * Retourne un liste fictive de cvs
   *
   * @returns CV[]
   *
   */
  getFakeCvs(): Cv[] {
    return this.cvs;
  }

  /**
   *
   * Retourne la liste des cvs de l'API
   *
   * @returns CV[]
   *
   */
  getCvs() {
    return this.http.get<Cv[]>(API.cv);
  }

  /**
   *
   * supprime un cv par son id de l'API
   *
   * @param id: number
   * @returns CV[]
   *
   */
  deleteCvById(id: number) {
    return this.http.delete<any>(API.cv + id);
  }

  addCv(cv: Cv) {
    return this.http.post<any>(API.cv, cv);
  }

  /**
   *
   * Retourne un cv par son id de l'API
   *
   * @param id: number
   * @returns CV[]
   *
   */
  getCvById(id: number) {
    return this.http.get<Cv>(API.cv + id);
  }

  /**
   *
   * Cherche un cv avec son id dans lai liste fictive de cvs
   *
   * @param id
   * @returns Cv | null
   */
  findCvById(id: number): Cv | null {
    return this.cvs.find((cv) => cv.id == id) ?? null;
  }

  /**
   *
   * Supprime un cv s'il le trouve
   *
   * @param cv : Cv
   * @returns boolean
   */
  deleteCv(cv: Cv): boolean {
    const index = this.cvs.indexOf(cv);
    if (index > -1) {
      this.cvs.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Recherche les cvs dont le name contient la chaine name passée en paramètre
   * @param name : string
   * @returns cvs Cv[]
   */
  selectByName(name: string) {
    const search = `{"where":{"name":{"like":"%${name}%"}}}`;
    const params = new HttpParams().set("filter", search);
    return this.http.get<any>(API.cv, { params });
  }
  /**
   * Recherche les cvs dont la valeur est égale à la chaine passée en paramètre
   * @param property : string, la propriété sur laquelle on va requeter
   * @param value : string, la valeur de la propriété sur laquelle on va requeter
   * @returns cvs Cv[]
   */
  selectByProperty(property: string, value: string) {
    const search = `{"where":{"${property}":"${value}"}}`;
    const params = new HttpParams().set("filter", search);
    return this.http.get<Cv[]>(API.cv, { params });
  }

  /**
   * Permet d'ajouter un cv au flux des cvs sélectionnés
   *
   * @param cv : Le cv à ajouter dans le flux des cvs sélectionnés
   */
  selectCv(cv: Cv) {
    this.#selectCv.set(cv);
  }
}
