import { Injectable, inject, signal, computed } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CONSTANTES } from 'src/config/const.config';
import { UserLoginDto } from '../dto/userLogin.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  #userSignal = signal<UserLoginDto | null>(null);
  user = this.#userSignal.asReadonly();
  isAuthenticated = computed<boolean>(() => {
    const user = this.#userSignal();
    return user !== null && user.token !== null;
  });
  constructor() {
    const user = localStorage.getItem(CONSTANTES.user);
    if (user) {
      this.#userSignal.set(JSON.parse(user));
    }
  }
  

  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap((response) => {
        const user: UserLoginDto = {
          token: response.id,
          created: response.created,
          ttl: response.ttl,
          userId: response.userId,
          email: credentials.email,
        };
        this.#userSignal.set(user);
        localStorage.setItem(CONSTANTES.user, JSON.stringify(user));
      })
    );
  }

  logout() {
    this.#userSignal.set(null);
    localStorage.removeItem(CONSTANTES.user);
  }
}

