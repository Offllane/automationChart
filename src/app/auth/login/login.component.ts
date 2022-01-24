import { Component, OnInit } from '@angular/core';
import {ILoginInform, IUserCredentials} from "../../models/interfaces";
import {ResourceService} from "../../services/resource.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userCredentials: IUserCredentials = {
    username: '',
    password: '',
    role: 'user'
  }
  public isInvalidLoginOrPassword = false;
  public isLoading = false;

  constructor(
    private resourceService: ResourceService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public login(): void {
    this.isLoading = true;
    const formData: FormData = new FormData();
    formData.append('username', this.userCredentials.username);
    formData.append('password', this.userCredentials.password);

    this.resourceService.login(formData).subscribe((data: ILoginInform) => {
      this.authService.setJWTToLocalStorage(data.access_token);
        this.authService.currentRole = data.role;
        localStorage.setItem('role', data.role);
        this.router.navigate(['/']);

        this.isLoading = false;
    },
      error => {
      if (error.status == 400) {
        this.isInvalidLoginOrPassword = true;
      }
      this.isLoading = false;
      });
  }

  public goToRegistrationPage(): void {
    this.router.navigate(['/register']);
  }

}
