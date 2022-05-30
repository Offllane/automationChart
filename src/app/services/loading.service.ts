import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public setIsLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
}
