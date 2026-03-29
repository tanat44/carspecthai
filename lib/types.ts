export type YmlFile = {
  name: string;
  path: string;
};

export type Physical = {
  width: number;
  length: number;
  height: number;
  wheelbase: number;
  floorHeight: number;
  weight: number;
};

export enum FuelType {
  Gasoline = "gasoline",
  Diesel = "diesel",
}

export type Engine = {
  name: string;
  hybrid: boolean;
  fuelType: FuelType;
  displacement: number;
};

export type Performance = {
  to100: number;
};

export type Options = {
  keyless?: boolean;
  bsm?: boolean;
  ldw?: boolean;
  la?: boolean;
  acc?: boolean;
  "360camera"?: boolean;
  tpms?: boolean;
  raeb?: boolean;
};

export type ModelTrimSlug = {
  modelSlug: string;
  trimSlug: string;
};
