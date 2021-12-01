import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IPopupConfig} from "../models/interfaces";

@Injectable({
  providedIn: 'root'
})
export class PopupsService {
  public popupState: BehaviorSubject<IPopupConfig | null> = new BehaviorSubject<IPopupConfig | null>(null);

  constructor() { }
}
