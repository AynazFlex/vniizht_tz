export interface ICharacteristic {
  speed: number;
  force: number;
  engineAmperage: number;
}

export interface IData {
  name: string;
  description: string;
  characteristics: ICharacteristic[];
}

export interface IInitialState {
  data: IData[];
  isLoading: boolean;
  error: string;
  trainName: string;
  characteristics: ICharacteristic[];
}
