import {Injectable} from "@angular/core";
import {Api} from "./api";
import {Transaction} from "./model/transaction";
import {Wallet} from "./model/wallet";
import * as Bitcoin from 'bitcoinjs-lib';
import * as bigi from 'bigi';
import * as buffer from 'buffer';
import {Article} from "./model/article";

declare const Buffer;

@Injectable()
export class TransactionService {

  token = "CHANGE";

  private walletCaract = {
    btc : {url : "btc/test3", rate: Math.pow(10, 8)},
    eth : {url : "beth/test", rate: Math.pow(10, 18)},
    neo : {url : "Testnet", rate: Math.pow(10, 0)},
    gas : {url : "Testnet", rate: Math.pow(10, 0)}
  };

  tokenUrl = "?token=" + this.token;

  transactions: Transaction[];

  constructor(private api: Api) {

  }

  private sendCrypto(trigram: string, amount: number, wallet: Wallet, toAddress: string) {
    // we suppose you have have already decrypted the private key
    let key = new Bitcoin.ECPair(bigi.fromHex(wallet.private));

    let endpoint = trigram.toLowerCase();

    let request = this.api.post(
      endpoint + "/new?token=" + this.token,
      JSON.stringify({inputs:[{addresses: [wallet.address]}],"outputs":[{"addresses": [toAddress], "value": amount}]}));

    request
      .subscribe(response => {
        let content = response.json();

        content.signatures = [];
        content.pubkeys = [];
        for(let s of content.tosign) {
          content.signatures.push(key.sign(new buffer.Buffer(s, "hex")).toDER().toString("hex"));
          content.pubkeys.push(key.getPublicKeyBuffer().toString("hex"));
        }
        this.api.post(
          endpoint + "/send?token=" + this.token,
          JSON.stringify(content)
        ).subscribe();
      });
    return request;


  }

  send(trigram: string, wallet: Wallet, toAddress: string, amount: number, label: string) {

  }

  payArticle(trigram: string, wallet: Wallet, toAddress: string, amount: number, label: string, article: Article) {

  }
}

