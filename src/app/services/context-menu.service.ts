import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {Switch} from "../models/types";

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {
  public cardContextMenuState: BehaviorSubject<Switch> = new BehaviorSubject<Switch>('close');
  public contextMenuParams: Subject<any> = new Subject<any>();

  openContextMenu(params: any): void {
    this.contextMenuParams.next(params);
    this.cardContextMenuState.next('open');
  }

  closeContextMenu(): void {
    this.cardContextMenuState.next('close');
    this.contextMenuParams.next();
  }

  constructor() { }
}
