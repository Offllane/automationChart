export interface IIdentifiers {
  id: number;
  parentId: number | null;
  chartId: number;
}

export interface listChartItem extends IIdentifiers{
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

export interface treeChartItem extends listChartItem{
  isHide?: boolean;
  subordinates: Array <treeChartItem>;
}
