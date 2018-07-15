import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Web3Service } from './web3.service';

declare var require: any;
const transactionArtifacts = require('../../build/contracts/Transaction.json');
const contract = require('truffle-contract');

@Injectable()
export class TransactionWeb3Service {

  Transaction = contract(transactionArtifacts);

  constructor(
    private web3Ser: Web3Service
  ) {
    this.Transaction.setProvider(this.web3Ser.web3.currentProvider);
  }

  getSales(from): Observable<any> {
    let meta;

    return Observable.create(observer => {
      this.Transaction
        .deployed()
        .then(instance => {
          meta = instance;
          //we use call here so the call doesn't try and write, making it free
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
          //we use call here so the call doesn't try and write, making it free
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

  buyItem(from, to, itemId, typeItem, location, pictureHash, comment, price): Observable<any> {
    let obj = {from, to, itemId, typeItem, location, pictureHash, comment, price};
    let meta;

    return Observable.create(observer => {
      this.Transaction
        .deployed()
        .then(instance => {
          meta = instance;
          //we use call here so the call doesn't try and write, making it free
          return meta.buyItem(
            to.startsWith("0x") ? to : "0x" + to,
            this.web3Ser.web3.fromAscii(itemId),
            this.web3Ser.web3.fromAscii(typeItem),
            this.web3Ser.web3.fromAscii(location),
            pictureHash,
            this.web3Ser.web3.fromAscii(comment),
            this.web3Ser.web3.fromAscii("sold"),
            this.web3Ser.web3.toWei(price, "ether"),
            {
              from: from.startsWith("0x") ? from : "0x" + from,
              value: this.web3Ser.web3.toWei(price, "ether"),
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
          //we use call here so the call doesn't try and write, making it free
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
