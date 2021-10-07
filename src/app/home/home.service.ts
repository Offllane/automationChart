import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {TreeType} from "../models/types";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public treeType: BehaviorSubject<TreeType> = new BehaviorSubject<TreeType>('vertical');

  constructor() { }
}
