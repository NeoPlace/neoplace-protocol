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



}
