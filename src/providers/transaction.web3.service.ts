import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Web3Service } from './web3.service';
import {Web3MobileService} from "./web3.mobile.service";

declare var require: any;
const transactionArtifacts = require('../../build/contracts/Transaction.json');
const contract = require('truffle-contract');

@Injectable()
export class TransactionWeb3Service {

  Transaction = contract(transactionArtifacts);

  web3: any;

  constructor(
    private web3Ser: Web3Service, private web3MobileSer: Web3MobileService
  ) {
  }

  initDesktop() {
    this.web3Ser.checkAndInstantiateWeb3().then(resp => {
      this.Transaction.setProvider(Web3Service.web3.currentProvider);
      this.web3 = Web3Service.web3.currentProvider;
    }).catch(err => {
      console.log("Fail instantiate web3", err);
    })
  }

  initMobile(privateKey: string, rpcUrl: string) {
    this.web3MobileSer.initWeb3(privateKey, rpcUrl);
    this.Transaction.setProvider(Web3MobileService.web3.currentProvider);
    this.web3 = Web3MobileService.web3.currentProvider;
  }

  getSales(from): Observable<any> {
    let meta;

    return Observable.create(observer => {
      this.Transaction
        .deployed()
        .then(instance => {
          meta = instance;
          return meta.getSales.call({
            from: from
          });
        })
        .then(value => {
          observer.next(value);
          observer.complete();
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
  });
})
}

getPurchases(from): Observable<any> {
  let meta;

    return Observable.create(observer => {
      this.Transaction
        .deployed()
        .then(instance => {
          meta = instance;
          return meta.getPurchases.call({
            from: from
          });
        })
        .then(value => {
          observer.next(value);
          observer.complete();
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    })
  }

  getTransaction(id): Observable<any> {
    let meta;

    return Observable.create(observer => {
      this.Transaction
        .deployed()
        .then(instance => {
          meta = instance;
          return meta.transactions.call(id);
        })
        .then(value => {
          observer.next(value);
          observer.complete();
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    })
  }

  send(from, to, price): Observable<any> {
    let meta;

    return Observable.create(observer => {
      this.Transaction
        .deployed()
        .then(instance => {
          console.log(to);
          meta = instance;
          return meta.sendAmount(
            to.startsWith("0x") ? to : "0x" + to,
            {
              from: from.startsWith("0x") ? from : "0x" + from,
              value: this.web3.toWei(price, "ether"),
              gasLimit: 3000000,
              gas: 500000,
              gasPrice: 4000000000
            }
          );
        })
        .then(value => {
          observer.next(value);
          observer.complete();
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    })
  }

  buyItem(from, to, itemId, typeItem, location, pictureHash, comment, price): Observable<any> {
    let obj = {from, to, itemId, typeItem, location, pictureHash, comment, price};
    let meta;

    return Observable.create(observer => {
      this.Transaction
        .deployed()
        .then(instance => {
          meta = instance;
          return meta.buyItem(
            to.startsWith("0x") ? to : "0x" + to,
            this.web3.fromAscii(itemId),
            this.web3.fromAscii(typeItem),
            this.web3.fromAscii(location),
            pictureHash,
            this.web3.fromAscii(comment),
            this.web3.fromAscii("sold"),
            this.web3.toWei(price, "ether"),
            {
              from: from.startsWith("0x") ? from : "0x" + from,
              value: this.web3.toWei(price, "ether"),
              gasLimit: 3000000,
              gas: 500000,
              gasPrice: 4000000000
            }
          );
        })
        .then(value => {
          observer.next(value);
          observer.complete();
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    })
  }

  sendAdditionalFunds(from, to, itemId, price): Observable<any> {
    let meta;

    return Observable.create(observer => {
      this.Transaction
        .deployed()
        .then(instance => {
          meta = instance;
          return meta.sendAdditionalFunds(
            to.startsWith("0x") ? to : "0x" + to,
            this.web3.fromAscii(itemId),
            this.web3.toWei(price, "ether"),
            {
              from: from.startsWith("0x") ? from : "0x" + from,
              value: this.web3.toWei(price, "ether"),
              gasLimit: 3000000,
              gas: 500000,
              gasPrice: 4000000000
            }
          );
        })
        .then(value => {
          observer.next(value);
          observer.complete();
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    })
  }

  unlockFunds(articleId, fromAddress): Observable<any> {
    let meta;

    return Observable.create(observer => {
      this.Transaction
        .deployed()
        .then(instance => {
          meta = instance;
          return meta.unlockFunds(
            articleId,
            {
              from: fromAddress.startsWith("0x") ? fromAddress : "0x" + fromAddress,
              gasLimit: 3000000,
              gas: 500000,
              gasPrice: 4000000000
            }
          );
        })
        .then(value => {
          observer.next(value);
          observer.complete();
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    })
  }

}
