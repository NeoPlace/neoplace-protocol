import {Injectable} from "@angular/core";
import {Api} from "./api";
import {AlertController, ToastController, LoadingController} from "ionic-angular";
import {Transaction} from "./model/transaction";
import {UserService} from "./user.service";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {ArticleService} from "./article.service";
import {Wallet} from "./model/wallet";
import * as CryptoJS from 'crypto-js';
import * as Bitcoin from 'bitcoinjs-lib';
import * as bigi from 'bigi';
import * as buffer from 'buffer';
import {Observable} from "rxjs/Observable";
import Neon, {api} from '@cityofzion/neon-js';
import {TransactionWeb3Service} from "./transaction..web3.service";
import * as Secp256k1 from 'secp256k1';

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

  payArticle(trigram: string, wallet: Wallet, toAddress: string, amount: number, label: string, article, articleId) {

  }

  payService(trigram: string, wallet: Wallet, toAddress: string, amount: number, label: string, service, serviceOrdered) {

  }
}

function sign(data, priv) {
  const bytesData = Buffer.from(hexToBytes(data));
  const bytesPriv = Buffer.from(hexToBytes(priv));

  const signObj = Secp256k1.sign(bytesData, bytesPriv);

  console.log(signObj);

  return Buffer.from(signObj['signature']).toString('hex');
}

// Convert a hex string to a byte array
function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

// Convert a byte array to a hex string
function bytesToHex(bytes) {
  for (var hex = [], i = 0; i < bytes.length; i++) {
    hex.push((bytes[i] >>> 4).toString(16));
    hex.push((bytes[i] & 0xF).toString(16));
  }
  return hex.join("");
}

