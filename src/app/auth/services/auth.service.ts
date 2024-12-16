import { Injectable } from "@angular/core";
import { CredentialsDto } from "../dto/credentials.dto";
import { LoginResponseDto } from "../dto/login-response.dto";
import { HttpClient } from "@angular/common/http";
import { API } from "../../../config/api.config";
import { Observable } from "rxjs";
import { STORAGE_KEY_NAMES } from "src/config/storage.config";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(STORAGE_KEY_NAMES.token);
  }

  logout() {
    localStorage.removeItem(STORAGE_KEY_NAMES.token);
    localStorage.removeItem(STORAGE_KEY_NAMES.addCvForm);
  }
}
