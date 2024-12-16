import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { CredentialsDto } from "../dto/credentials.dto";
import { LoginResponseDto } from "../dto/login-response.dto";
import { HttpClient } from "@angular/common/http";
import { API } from "../../../config/api.config";
import { filter, fromEvent, map, Observable, tap } from "rxjs";
import { AUTH_STORAGE_KEY } from "../../../config/auth.config";
import { DOCUMENT } from "@angular/common";
import { Auth } from "../model/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private http = inject(HttpClient);
  window = inject(DOCUMENT).defaultView!;

  #data = signal<Auth | null>(null);

  #data$ = fromEvent<StorageEvent>(this.window, "storage").pipe(
    filter(({ key }) => !key || key === AUTH_STORAGE_KEY),
    map(({ key, newValue }) => {
      if (!key || !newValue) {
        return null;
      }

      return JSON.parse(newValue) as Auth;
    }),
  );

  public user = computed(() => {
    if (!this.#data()) {
      return null;
    }

    const { token: _token, ...user } = this.#data()!;

    return user;
  });
  public token = computed(() => this.#data()?.token ?? null);
  public isAuthenticated = computed(() => this.#data() !== null);

  constructor() {
    const data = localStorage.getItem(AUTH_STORAGE_KEY);

    if (data) {
      this.#data.set(JSON.parse(data));
    }

    this.#data$.subscribe((data) => {
      this.#data.set(data);
    });

    effect(() => {
      const data = this.#data();

      if (this.isSynced(data)) {
        return;
      }

      if (!data) {
        localStorage.removeItem(AUTH_STORAGE_KEY);

        return;
      }

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
    });
  }

  private isSynced(data: Auth | null): boolean {
    const storedData = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!data && !storedData) {
      return true;
    }

    if (!data || !storedData) {
      return false;
    }

    const { id, email, token } = JSON.parse(storedData) as Auth;

    return data.id === id && data.email === email && data.token === token;
  }

  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap(({ id: token, userId: id }: LoginResponseDto) => {
        const data = { id, email: credentials.email, token };

        this.#data.set(data);
      }),
    );
  }

  logout() {
    this.#data.set(null);
  }
}
