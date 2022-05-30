import {Component, OnDestroy, OnInit} from '@angular/core';
import {HomeService} from "../../services/home.service";
import {Subscription} from "rxjs";
import {LoadingService} from "../../services/loading.service";

@Component({
  selector: 'app-loader-wrapper',
  templateUrl: './loader-wrapper.component.html',
  styleUrls: ['./loader-wrapper.component.scss']
})
export class LoaderWrapperComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  public isLoading = false;

  constructor(
    private homeService: HomeService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.loadingService.setIsLoading.subscribe((isLoading: boolean) => {
      this.setIsLoading(isLoading);
    }));
  }

  public setIsLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
    if (isLoading) { this.homeService.headerState.next('close') }
    else { this.homeService.headerState.next('open') }
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
