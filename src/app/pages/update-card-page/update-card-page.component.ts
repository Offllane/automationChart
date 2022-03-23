import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ResourceService} from "../../services/resource.service";

@Component({
  selector: 'app-update-card-page',
  templateUrl: './update-card-page.component.html',
  styleUrls: ['./update-card-page.component.scss']
})
export class UpdateCardPageComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private resourceService: ResourceService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.activateRoute.params.subscribe(params => {
      console.log(params);
      this.getPersonCardInform(params.cardId);
    }));
  }

  getPersonCardInform(cardId: number): void {
    this.resourceService.getPersonCard(cardId).subscribe(cardInform => {
      console.log(cardInform);
    }, () => {
        this.router.navigate(['/chart']);
      });
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
