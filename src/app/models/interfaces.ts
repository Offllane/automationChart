export interface listChartItem {
  id: number;
  parentId: number | null;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  age: number;
}

export interface treeChartItem {
  id: number;
  parentId: number | null;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  age: number;
  isHide?: boolean;
  subordinates: Array <treeChartItem>;
}
