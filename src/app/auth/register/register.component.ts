import { Component, OnInit } from '@angular/core';
import {IUserCredentials} from "../../models/interfaces";
import {ResourceService} from "../../services/resource.service";
import { Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public errorMessage = '';
  public userCredentials: IUserCredentials = {
    username: '',
    password: '',
    role: 'user'
  }

  constructor(
    private resourceService: ResourceService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public register(): void {
    const formData: FormData = new FormData();
    formData.append('login', this.userCredentials.username);
    formData.append('password', this.userCredentials.password);
    formData.append('role', this.userCredentials.role);
    this.resourceService.addNewUser(formData).subscribe((data: IUserCredentials) => {
      this.router.navigate(['/login']);
    },
      error => {
        this.errorMessage = error.error;
      });
  }

  public goToLoginPage(): void {
    this.router.navigate(['/login']);
  }

}
