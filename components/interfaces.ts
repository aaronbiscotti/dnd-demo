export interface BOX {
    color: string;
    placed: boolean;
    id: number;
    boxType?: string;
}

export interface ITEM {
  type: string;
  boxType: string;
  color: string;
  ID: number;
}