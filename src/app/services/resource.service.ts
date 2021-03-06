import { Injectable } from '@angular/core';
import {
  IChartParams,
  IGroup,
  IListChartItem,
  ILoginInform,
  IPermissionList,
  IUser, IUserChart,
  IUserCredentials
} from "../models/interfaces";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {shareReplay } from 'rxjs/operators'
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  public chartsData:Subject<IChartParams> = new Subject<IChartParams>(); // TODO удалится после подключенгия к бэку чартов
  private api = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public login(userCredentials : FormData) {
    return this.http.post<ILoginInform>(this.api + '/login', userCredentials).pipe(shareReplay());
  }

  // register
  public addNewUser(userCredentials: FormData) {
    return this.http.post<IUserCredentials>(this.api + '/register', userCredentials).pipe(shareReplay());
  }

  public getUserCharts() {
    return this.http.get<Array<IChartParams>>(this.api + '/api/chart');
  }

  public addNewChart(chartName: any) {
    return this.http.post(this.api + '/api/chart', {"chartName": chartName})
  }

  public renameChart(chart: any) {
    return this.http.put(this.api + '/api/chart/changeName', chart);
  }

  public deleteChart(chartId: number) {
    return this.http.delete(this.api + '/api/chart/' + chartId);
  }

  public getPersonCard(cardId: number) {
    return this.http.get<IListChartItem>(this.api + '/api/personCard/' + cardId);
  }

  public addNewPersonCard(personCard: any) {
    return this.http.post<IListChartItem>(this.api + '/api/personCard', personCard);
  }

  public updatePersonCard(personCard: IListChartItem) {
    return this.http.put(this.api + '/api/personCard', personCard);
  }

  public deletePersonCard(cardId: number) {
    return this.http.delete(this.api + '/api/personCard/'+ cardId);
  }

  public getAllGroups() {
    return this.http.get<Array<IGroup>>(this.api + '/api/permissionGroups');
  }

  public addNewGroup(groupName: string) {
    return this.http.post<Array<IGroup>>(this.api + '/api/permissionGroups', {"groupName": groupName});
  }

  public removeGroup(groupId: number) {
    return this.http.delete<Array<IGroup>>(this.api + '/api/permissionGroups/' + groupId);
  }

  public getAllUsers() {
    return this.http.get<Array<IUser>>(this.api + '/api/userAccounts');
  }

  public getUsersByLogin(login: string) {
    const userObject = { Login: login};
    return this.http.post<Array<IUser>>(this.api + '/api/getUsersByLogin', userObject);
  }

  public addUserToGroup(group: IGroup, userId: number) {
    return this.http.put(this.api + '/api/permissionGroups/' + userId, {id: group.id, groupName: group.groupName, permissionListId: group.permissionListId} )
  }

  public removeUserFromGroup(groupId: number, userId: number) {
    return this.http.delete(this.api + '/api/deleteUser/' + groupId +'/' + userId);
  }

  public updatePermissionList(permissionList: IPermissionList) {
    return this.http.put(this.api + '/api/PermissionLists/' + permissionList.id, permissionList );
  }

  public getAccountPermission(){
    return this.http.get(this.api + '/api/getUsersPermission');
  }

  public addChartToUser(userChart: IUserChart) {
    return this.http.post(this.api + '/api/UserChart', userChart);
  }

  public uploadImage(formData: FormData) {
    return this.http.post('http://api.cloudinary.com/v1_1/offllane/upload', formData);
  }

  public copyChart(startChartId: number, endChartId: number) {
    return this.http.post(this.api + `/api/personCard/copyChart/${startChartId}/${endChartId}`, {});
  }
}
