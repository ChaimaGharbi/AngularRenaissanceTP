import { Injectable, signal, WritableSignal } from '@angular/core';
import { Cv } from '../model/cv';

@Injectable({
  providedIn: 'root',
})
export class EmbaucheService {
  private embauchees: WritableSignal<Cv[]> = signal([]);

  constructor() {}

  /**
   *
   * Retourne la liste des embauchees
   *
   * @returns CV[]
   *
   */
  getEmbauchees(): Cv[] {
    return this.embauchees();
  }

  /**
   *
   * Embauche une personne si elle ne l'est pas encore
   * Sinon il retourne false
   *
   * @param cv : Cv
   * @returns boolean
   */
  embauche(cv: Cv | null): boolean {
    if(cv)
    if (this.embauchees().indexOf(cv) == -1) {
      this.embauchees.update( cvs => {cvs.push(cv); return cvs;})
      return true;
    }
    return false;
  }
}
