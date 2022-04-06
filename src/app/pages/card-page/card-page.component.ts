import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {IListChartItem, ISegregatedListChartItem} from "../../models/interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {ResourceService} from "../../services/resource.service";
import {CardPageActionsService} from "../../services/card-page-actions.service";

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss']
})
export class CardPageComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  public cardInform: IListChartItem | null = null;
  public segregatedCardInform: ISegregatedListChartItem | null = null;
  public isCardFormReady = false;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private resourceService: ResourceService,
    private cardPageActionService: CardPageActionsService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.activateRoute.params.subscribe(params => {
      this.getPersonCardInform(params.cardId);
    }));
  }

  getPersonCardInform(cardId: number): void {
    this.resourceService.getPersonCard(cardId).subscribe((cardInform: IListChartItem) => {
      this.cardInform = cardInform;
      this.segregatedCardInform = this.cardPageActionService.createSegregatedCardInform();
      this.isCardFormReady = true;
    }, () => {
      this.router.navigate(['/chart']);
    });
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
