import {Injectable} from "@angular/core";
import {Response, Http} from "@angular/http";
import {Api} from "./api";
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/map';
import {Wallet} from "./model/wallet";
import Neon from '@cityofzion/neon-js';
import nem from 'nem-sdk';
import CryptoHelpers from 'nem-sdk';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';


@Injectable()
export class WalletService {

  token = "TODO";
  public  trigramAvailable = ['ETH', 'BTC', 'GAS', 'NEO'];

  public wallets: Wallet;


  private walletCaract = {
    btc : {url : "btc/test3/addrs", rate: Math.pow(10, 8)},
    eth : {url : "beth/test/addrs", rate: Math.pow(10, 18)},
    neo : {url : "testnet", rate: Math.pow(10, 18)}
  };

  tokenUrl = "?token=" + this.token;

  constructor(private api: Api,
              private http: Http) {

  }

  createWallet(cryptoTrigram: string):Observable<Wallet>{
    return this.api.post(this.walletCaract[cryptoTrigram.toLowerCase()].url + this.tokenUrl,
      {}).map(mapWallet);

  }

  getBalanceWallets(fromAddress: string, trigram: string) {
    return this.api.get(this.walletCaract[trigram.toLowerCase()].url + "/" + fromAddress + "/balance" + this.tokenUrl,
      {},).map(data => data.json().balance / this.walletCaract[trigram.toLowerCase()].rate);
  }

  saveWallets(wallets, uid: string) {
  }

  getWallets(uid: string) {
  }

  createWalletNeo():Observable<Wallet> {
    const privateKey = Neon.create.privateKey();
    const publicKey = Neon.get.publicKeyFromPrivateKey(privateKey);
    const scriptHash = Neon.get.scriptHashFromPublicKey(publicKey);
    const address = Neon.get.addressFromScriptHash(scriptHash);
    return Observable.fromPromise(new Promise((resolve) => {
      resolve(<Wallet>({name: 'NEO', trigram: 'NEO', address: address, public: publicKey, private: privateKey, amount: 0}));
    }));
  }

  getBalanceWalletNeo(fromAddress: string) {
    const balance = Neon.get.balance( 'TestNet', fromAddress);
    return Observable.fromPromise(balance);
  }

  createWalletNem():Observable<Wallet> {

    var privateKey = nem.crypto.cryptoHelpers.derivePassSha("a password", 6000).priv;
    var kp = nem.crypto.cryptoHelpers.keyPair.create(privateKey);

    // Create a private key wallet
    var wallet = nem.model.wallet.importPrivateKey("a name", "a password", privateKey, nem.model.network.data.testnet.id);

    return Observable.fromPromise(new Promise((resolve) => {
      resolve(<Wallet>({name: 'NEM', trigram: 'XEM', address: wallet.address, public: kp.publicKey.toString(), private: privateKey, amount: 0}));
    }));
  }

  getBalanceWalletNem(fromAddress: string) {
    var options;
    var params = {address: fromAddress};

    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    return this.http.post("http://explorer.nemchina.com/account/detail", options);
  }

}

function mapWallet(response:Response):Wallet{
  let wallet = null;
  if(response.json().wif) {
    wallet = <Wallet>({
      name: 'Bitcoin',
      trigram: 'BTC',
      address: response.json().address,
      public: response.json().public,
      private: response.json().private,
      amount: 0
    });
  } else {
    wallet = <Wallet>({
      name: 'Ethereum',
      trigram: 'ETH',
      address: response.json().address,
      public: response.json().public,
      private: response.json().private,
      amount: 0
    });
  }

  return wallet;
}
