import {Injectable} from "@angular/core";
import {Response, Http} from "@angular/http";
import {Api} from "./api";
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/map';
import {Wallet} from "./model/wallet";
import {AngularFireDatabase} from "angularfire2/database";
import Neon from '@cityofzion/neon-js';
import {Web3Service} from "./web3.service";


@Injectable()
export class WalletService {

  token = "TODO";
  public  trigramAvailable = ['ETH', 'BTC'];

  public wallets: Wallet;


  private walletCaract = {
    btc : {url : "btc/test3/addrs", rate: Math.pow(10, 8)},
    eth : {url : "beth/test/addrs", rate: Math.pow(10, 18)}
  };

  constructor() {

  }

  createWallet(cryptoTrigram: string):Observable<Wallet>{

  }

  getBalanceWallets(fromAddress: string, trigram: string) {

  }

  saveWallets(wallets, uid: string) {
  }

  getWallets(uid: string) {
  }

}

