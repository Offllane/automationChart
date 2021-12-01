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
  chartId: number;
  userId: number;
  chartName: string;
}

export interface IPopupConfig {
  popupTitle: string;
  popupMode: PopupMode;
}
