import { Injectable } from '@angular/core';
import { CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(): boolean  {
    if (this.authService.isCurrentUserAdmin()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
