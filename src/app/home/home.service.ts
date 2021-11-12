import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Switch, TreeType} from "../models/types";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public treeType: BehaviorSubject<TreeType> = new BehaviorSubject<TreeType>('horizontal');
  public bufferState: BehaviorSubject<Switch> = new BehaviorSubject<Switch>('close');

  constructor() { }
}
