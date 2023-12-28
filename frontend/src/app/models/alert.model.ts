export interface Alert {
  status: number;
  errors?: {
    [key: string]: string[]
  };
  title: string;
}
