

import {Http} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class CryptocompareService {
  private url: string = 'https://min-api.cryptocompare.com/data/price?';

  private currencies: any ={};

  private cryptos: string[] = ['USD', 'EUR'];

  constructor(public http: Http) {
    for(let crypto of this.cryptos) {

      this.http.get(this.url + 'fsym=' + crypto + '&tsyms=' + this.cryptos.toString())
        .subscribe(data => {
          this.currencies[crypto] = data.json();
        });
    }
  }

  getRateCrypto(crypto: string) {
    return  this.http.get(this.url + 'fsym=' + crypto.toUpperCase()
      + '&tsyms=' + this.cryptos.toString()).map(res => res.json());

  }
  
}
