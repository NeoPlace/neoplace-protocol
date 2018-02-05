import { Injectable } from '@angular/core';

declare var window: any;

const Web3 = require('web3');

export const environment = {
  production: false,
  HttpProvider: "YOUR NODE"
};

@Injectable()
export class Web3Service {

	public web3: any;

  constructor() {
  	this.initWeb3();
  }

  initWeb3() {
    // initialize web3
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(environment.HttpProvider)
    );
  }

}
