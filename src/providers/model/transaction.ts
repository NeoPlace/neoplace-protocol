export interface Transaction {
  cryptoTrigram: string,
  walletFrom: string;
  walletTo: string;
  amount: number;
  date: number;
  label: string;
  service?: any;
  fiat?:boolean;
  currency:string;
  hash?: string;
}
