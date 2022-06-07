import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ResourceService} from "../../services/resource.service";
import {HomeService} from "../../services/home.service";
import {Subscription} from "rxjs";
import {Switch} from "../../models/types";
import {ContextMenuService} from "../../services/context-menu.service";
import {Router} from "@angular/router";
import {LoadingService} from "../../services/loading.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  public bufferState: Switch = 'close';

  @HostListener('document:click') onClickOutside() {
    this.contextMenuService.closeContextMenu();
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private resourceService: ResourceService,
    private homeService: HomeService,
    private contextMenuService: ContextMenuService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.loadingService.setIsLoading.next(true);
    this.resourceService.getAccountPermission().subscribe((data: any) => {
      if(data[0]?.permissionList) {
        this.authService.accountPermission.next(data[0].permissionList);
      }
      this.loadingService.setIsLoading.next(false);
    }, error => {
        if( error.status === 401) {
          this.router.navigate(['/login']);
          this.loadingService.setIsLoading.next(false);
        }
      });
    this.dataSubscription.add(this.homeService.bufferState.subscribe((bufferState: Switch) => {
      this.bufferState = bufferState;
    }));
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
