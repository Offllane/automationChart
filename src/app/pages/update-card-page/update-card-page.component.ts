import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ResourceService} from "../../services/resource.service";
import {IListChartItem, ISegregatedListChartItem} from "../../models/interfaces";
import {FormControl, FormGroup} from "@angular/forms";
import {CardPageActionsService} from "../../services/card-page-actions.service";

@Component({
  selector: 'app-update-card-page',
  templateUrl: './update-card-page.component.html',
  styleUrls: ['./update-card-page.component.scss']
})
export class UpdateCardPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  public segregatedCardInform: any = null;
  public cardInform: IListChartItem | null = null;
  public cardForm: FormGroup = new FormGroup({});
  public isCardFormReady = false;
  public isAnyValueWasChanged = false;

  get isUpdateButtonEnabled() {
    return this.isAnyValueWasChanged;
  }

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private resourceService: ResourceService,
    private cardPageService: CardPageActionsService
  ) {
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSubscription.add(this.activateRoute.params.subscribe(params => {
      this.getPersonCardInform(params.cardId);
    }));
  }

  getPersonCardInform(cardId: number): void {
    this.resourceService.getPersonCard(cardId).subscribe((cardInform: IListChartItem) => {
      this.cardInform = cardInform;
      this.segregatedCardInform = this.cardPageService.createSegregatedCardInform();
      this.cardForm = this.createFormGroup();
      this.subscribeToCardFormChanges();
      this.isCardFormReady = true;
    }, () => {
        this.router.navigate(['/chart']);
      });
  }

  private createFormGroup(): FormGroup {
    const formGroup: FormGroup = new FormGroup({});
    for (const [key] of Object.entries(this.segregatedCardInform)) {
     formGroup.addControl(key, new FormGroup({}));
      for (let j = 0; j < this.segregatedCardInform[key].length; j++) {
        const currentPropertyInform = this.segregatedCardInform[key][j];
        const currentInformFormGroup: FormGroup = formGroup.get(key) as FormGroup;
        currentInformFormGroup.addControl(currentPropertyInform.propertyFormControlValue,
          // @ts-ignore
          new FormControl(this.cardInform[currentPropertyInform.propertyFormControlValue]));
      }
    }
    return formGroup;
  }

  subscribeToCardFormChanges(): void {
    this.dataSubscription.add(this.cardForm.valueChanges.subscribe(data => {
      this.isAnyValueWasChanged = true;
    }));
  }

  updatePersonCardInform(): void {
    const cardInform = {
      ...this.cardInform,
      ...this.cardForm.value.generalInform,
      ...this.cardForm.value.workInform,
      ...this.cardForm.value.personalInform,
    }
    this.dataSubscription.add(this.resourceService.updatePersonCard(cardInform).subscribe(() => {
    }));
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
