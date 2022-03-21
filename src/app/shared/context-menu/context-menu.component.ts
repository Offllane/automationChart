import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ContextMenuService} from "../../services/context-menu.service";
import {ContextMenuMode, Switch} from "../../models/types";
import { personCardContextMenuActions} from "../../models/data";

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  public state: Switch = 'close'
  public contextMenuParams = {xPosition: 0, yPosition: 0};
  public actions: any;

  constructor(
    private contextMenuService: ContextMenuService
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

  setContextMenuAction(action: string): void {
    switch (action) {
      case 'updatePersonCard': {
        this.openUpdateCardPage();
        break;
      }
      case 'deletePersonCard': {
        break;
      }
    }
  }

  openUpdateCardPage(): void {
    console.log('here');
  }

  closeContextMenu():void {
    this.contextMenuService.closeContextMenu();
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
