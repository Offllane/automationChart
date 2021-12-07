import {Injectable, OnDestroy} from '@angular/core';
import {IPermissionList} from "../models/interfaces";
import {Subject, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{
  private dataSubscription: Subscription = new Subscription();
  public currentRole: string  = "user";
  public accountPermission: Subject<IPermissionList> = new Subject<IPermissionList>();
  public accountPermissionsList: IPermissionList | undefined;

  constructor(
  ) {
    this.dataSubscription.add(this.accountPermission.subscribe((accountPermissionsList: IPermissionList) => {
      this.accountPermissionsList = accountPermissionsList;
    }))
  }

  public setJWTToLocalStorage(JWTToken: string): void {
    localStorage.setItem('token', JWTToken);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  public isCurrentUserAdmin() {
    return localStorage.getItem('role') === 'admin';
  }

  public logout() {
    localStorage.removeItem('token');
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
