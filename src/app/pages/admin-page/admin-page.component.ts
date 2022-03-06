import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AdminService} from "../../services/admin.service";
import {IGroup, IPermissionList, IUserInGroup} from "../../models/interfaces";
import {group} from "@angular/animations";
import {ResourceService} from "../../services/resource.service";
import {PopupsService} from "../../services/popups.service";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  public currentActiveGroupIndex = -1;
  public groups: Array<IGroup> = [];
  public currentGroupPermissionList: IPermissionList = {
    id: -1,
    canDownload: false,
    canReadAddress: false,
    canReadPassportData: false,
    canUpload: false
  }
  public usersInSelectedGroup: Array<IUserInGroup> = [];

  constructor(
    private adminService: AdminService,
    private resourceService: ResourceService,
    private popupService: PopupsService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.adminService.groupsSubject.subscribe((data: Array<IGroup>) => {
      this.groups = data;
      this.selectGroup(this.currentActiveGroupIndex);
    }));
    this.dataSubscription.add(this.adminService.userIdToAddingToGroup.subscribe((userId: number) => {
      this.addUserToGroup(userId);
    }));
    this.adminService.getAllGroups();
  }

  public selectGroup(groupIndex: number): void {
    this.currentActiveGroupIndex = groupIndex;
    this.usersInSelectedGroup = this.groups[groupIndex]?.userInGroup;
    this.currentGroupPermissionList = this.groups[groupIndex]?.permissionList ?? this.currentGroupPermissionList;
  }

  public removeGroup() {
    this.resourceService.removeGroup(this.groups[this.currentActiveGroupIndex].id).subscribe(() => {
      this.selectGroup(this.currentActiveGroupIndex - 1);
      this.adminService.getAllGroups();
    });
  }

  public openAddUserToGroupPopup() {
    this.popupService.popupState.next({
      popupTitle: `Add new user to ${this.groups[this.currentActiveGroupIndex].groupName} Group`,
      popupMode: "addUserToGroup"
    });
  }

  public addUserToGroup(userId: number): void {
    this.resourceService.addUserToGroup(this.groups[this.currentActiveGroupIndex], userId).subscribe(data => {
      this.adminService.getAllGroups();
    });
  }

  public removeUserFromGroup(userId: number): void {
    const groupId = this.groups[this.currentActiveGroupIndex].id;
    this.resourceService.removeUserFromGroup(groupId, userId).subscribe(() => {
      this.adminService.getAllGroups();
    });
  }

  public updatePermissionList():void {
    this.resourceService.updatePermissionList(this.currentGroupPermissionList).subscribe(data => {
      this.adminService.getAllGroups();
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

}
