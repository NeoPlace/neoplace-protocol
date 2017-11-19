export interface Service {
  title:string;
  type:string;
  description:string;
  price?:number;
  isHourly?:boolean;
  isRemote?:boolean;
  taked_picture: any;
  serviceId?: string;
  uid?: string;
  latitude?: number;
  longitude?: number;
  currency?: string;
  address?: string;
}
