import {Injectable, OnDestroy} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {ResourceService} from "../../services/resource.service";
import {IGroup} from "../../models/interfaces";

@Injectable({
  providedIn: 'root'
})
export class AdminService implements OnDestroy{
  private dataSubscription: Subscription = new Subscription();
  public userIdToAddingToGroup: Subject<number> = new Subject<number>();
  public groupsSubject: Subject< Array<IGroup>> = new Subject();

  constructor(
    private resourceService: ResourceService
  ) { }

  public getAllGroups():void {
    this.dataSubscription.add(this.resourceService.getAllGroups().subscribe((data: Array<IGroup>) => {
      this.groupsSubject.next(data);
    }))
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
