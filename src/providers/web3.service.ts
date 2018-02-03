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
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      console.warn(
        'Using web3 detected from external source.'
      );
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.warn(
        'No web3 detected.'
      );
      this.web3 = new Web3(
        new Web3.providers.HttpProvider(environment.HttpProvider)
      );
    }
  }

}
