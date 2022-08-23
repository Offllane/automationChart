import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {IListChartItem} from "../../models/interfaces";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ResourceService} from "../../services/resource.service";
import {CardPageActionsService} from "../../services/card-page-actions.service";
import {ChartService} from "../../services/chart.service";

@Component({
  selector: 'app-create-card-page',
  templateUrl: './create-card-page.component.html',
  styleUrls: ['./create-card-page.component.scss']
})
export class CreateCardPageComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  public segregatedCardInform: any = null;
  public cardInform: IListChartItem | null = null;
  public cardForm: FormGroup = new FormGroup({});
  public isCardFormReady = false;
  public isAnyValueWasChanged = false;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private resourceService: ResourceService,
    private cardPageService: CardPageActionsService,
    private chartService: ChartService
  ) { }

  get isUpdateButtonEnabled() {
    return this.isAnyValueWasChanged;
  }

  ngOnInit(): void {
    this.cardInform = {
      parentId: null,
      chartId: this.chartService.currentSelectedChartId,
      id: 0,
      firstName: '',
      lastName: '',
      city: '',
      country: '',
      age: ''
    };
    this.segregatedCardInform = this.cardPageService.createSegregatedCardInform();
    this.cardForm = this.createFormGroup();
    this.subscribeToCardFormChanges();
    this.isCardFormReady = true;
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
      this.getPersonCardInform(cardInform.id);
    }));
  }

  createPersonCard(): void {
    const cardInform = {
      ...this.cardInform,
      ...this.cardForm.value.generalInform,
      ...this.cardForm.value.workInform,
      ...this.cardForm.value.personalInform,
      id: null
    }
    this.dataSubscription.add(this.resourceService.addNewPersonCard(cardInform).subscribe((data: IListChartItem) => {
     this.router.navigate(['update-card/' + data.id]);
    }));
  }

  updateCardInformAvatar(avatarPhotoLink: any): void {
    if (this.cardInform) {this.cardInform.avatarPhotoLink = avatarPhotoLink; }
    this.updatePersonCardInform();
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
