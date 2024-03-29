import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ContextMenuService} from "../../services/context-menu.service";
import {ContextMenuMode, Switch} from "../../models/types";
import { personCardContextMenuActions} from "../../models/data";
import {Router} from "@angular/router";
import {IPersonCardContextAction} from "../../models/interfaces";
import {PopupsService} from "../../services/popups.service";

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  public state: Switch = 'close'
  public contextMenuParams: any = {xPosition: 0, yPosition: 0};
  public actions: any;

  constructor(
    private router: Router,
    private contextMenuService: ContextMenuService,
    private popupService: PopupsService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.contextMenuService.cardContextMenuState.subscribe((state: Switch) => {
      this.state = state;
    }));
    this.dataSubscription.add(this.contextMenuService.contextMenuParams.subscribe((params: any) => {
      if (params) {
        this.contextMenuParams = params;
        this.actions = this.getActionsByMode(params.mode);
      } else {
        this.contextMenuParams = {xPosition: 0, yPosition: 0};
      }
    }));
  }

  getActionsByMode(mode: ContextMenuMode): Array<any> {
    switch (mode) {
      case "cardContextMenuMode": return personCardContextMenuActions;
      default: return [];
    }
  }

  setContextMenuAction(action: IPersonCardContextAction): void {
    switch (action) {
      case 'openPersonCard': {
        this.openCardPage();
        break;
      }
      case 'updatePersonCard': {
        this.openUpdateCardPage();
        break;
      }
      case 'deletePersonCard': {
        this.deleteCard();
        break;
      }
    }
  }

  openCardPage(): void {
    this.router.navigate(['/card/' + this.contextMenuParams.cardId]);
  }

  openUpdateCardPage(): void {
    this.router.navigate(['/update-card/' + this.contextMenuParams.cardId]);
  }

  deleteCard(): void {
    this.popupService.popupState.next({
      popupTitle: 'Вы уверены, что хотите удалить человека из схемы?',
      popupMode: 'deletePersonCardConfirmation',
      popupInform: { cardId: this.contextMenuParams.cardId }
    })
  }

  closeContextMenu():void {
    this.contextMenuService.closeContextMenu();
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
