export interface Article {
  title:string;
  type:string;
  description:string;
  price:number;
  ean?: string;
  taked_picture: any;
  articleId?: string;
  uid?: string,
  status: string,
  latitude?: number,
  longitude?: number,
  currency: string,
  brand:string,
  condition:string,
  address?:string
}
