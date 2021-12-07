import {PopupMode} from "./types";

export interface ICardIdentifiers {
  id: number;
  parentId: number | null;
  chartId: number;
}

export interface IListChartItem extends ICardIdentifiers{
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  birthDate?: string;
  age?: number;
  sex?: string;
  position?: string;
  department?: string;
  passport?: string;
  city?: string;
  country?: string;
  phoneNumber?: string;
  education?: string;
  photo?: any;
}

export interface ITreeChartItem extends IListChartItem{
  isHide?: boolean;
  subordinates: Array <ITreeChartItem>;
}

export interface IChartParams {
  chartName: string;
  id: number;
  personCard?: Array<IListChartItem>;
  userChart?: [];
}

export interface IPopupConfig {
  popupTitle: string;
  popupMode: PopupMode;
}

export interface IUserCredentials {
  username: string;
  password: string;
  role: string;
}

export interface ILoginInform {
  id: string;
  access_token: string;
  username: string;
  role: string;
}

export interface IGroup {
  id: number;
  groupName: string;
  userInGroup: Array<IUserInGroup>;
  permissionListId: number;
  permissionList: IPermissionList;
}

export interface IUserInGroup {
  user: IUser;
}

export interface IUser {
  id: number;
  login: string;
  role: string;
  userChart? : Array<any>
}

export interface IPermissionList {
  id: number;
  canDownload: boolean;
  canUpload: boolean;
  canReadAddress: boolean;
  canReadPassportData: boolean;
}
