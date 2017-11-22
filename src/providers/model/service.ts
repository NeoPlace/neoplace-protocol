export interface Service {
  title:string;
  type:string;
  description:string;
  price?:number;
  isHourly?:boolean;
  isRemote?:boolean;
  taked_picture: any;
  latitude?: number;
  longitude?: number;
  currency?: string;
  address?: string;
}
