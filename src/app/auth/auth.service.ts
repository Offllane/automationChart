import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public setJWTToLocalStorage(JWTToken: string): void {
    localStorage.setItem('token', JWTToken);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  public logout() {
    localStorage.removeItem('token');
  }
}
