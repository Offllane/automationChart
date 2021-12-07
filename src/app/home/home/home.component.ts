import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {ResourceService} from "../../services/resource.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private resourceService: ResourceService
  ) { }

  ngOnInit(): void {
    this.resourceService.getAccountPermission().subscribe((data: any) => {
      if(data[0]?.permissionList) {
        this.authService.accountPermission.next(data[0].permissionList);
      }
    });
  }

}
