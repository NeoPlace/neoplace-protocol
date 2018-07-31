import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from "./api.service";

declare var window: any;
declare var require: any;

const Web3 = require('web3');


export const environment = {
  production: false,
  HttpProvider: "http://localhost:7545"
};

@Injectable()
export class Web3Service {

	public static web3: any;
	public static account: any;

  constructor(private apiService: ApiService,
              private router: Router) {
  }

  checkAndInstantiateWeb3() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    return new Promise((resolve, reject) => {
      if (typeof window.web3 !== 'undefined') {
        console.warn('Using web3 detected from external source. If you find that your accounts don\'t appear, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask'
        );
        // Use Mist/MetaMask's provider
        Web3Service.web3 = new Web3(window.web3.currentProvider);

        Web3Service.account = window.web3.eth.accounts[0];
        var self = this;

        //check account unlocked
        if(!window.web3.eth.accounts[0]) {
          window.alert("Please unlock your Metamask account.");
          reject(false);
        }

        //check valid network
        if(window.web3.version.network != 4) {
          window.alert("Please use Rinkeby test network on Metamask.");
          reject(false);
        }

        if(window.web3.eth.accounts[0] && window.web3.version.network != 4) {
          resolve(true);
        } else {
          reject(false);
        }
      } else {
        window.alert("Please install MetaMask first.");
        reject(false);
      }
    });


  };



  login(publicAddress) {
    return new Promise((resolve, reject) => {
      let seq = this.apiService.get("subscribe/address", {publicAddress: publicAddress}).toPromise();

      return seq.then(value => {
        if(value) {
          this.signMessage(value['publicAddress'], value['nonce'])
            .then(value1 => {
              this.authenticate(value1['publicAddress'], value1['signature'])
                .subscribe(value2 => {
                  if(value2.headers.get('authorization')) {
                    ApiService.token = value2.headers.get('authorization');
                    resolve(true);
                  }
                }, error => {
                  reject(error);
                })
            }).catch(err => {
              reject(err)
          });
        } else {
          this.signup(publicAddress).subscribe(valueSignup => {
            this.signMessage(valueSignup['publicAddress'], valueSignup['nonce'])
              .then(value1 => {
                this.authenticate(value1['publicAddress'], value1['signature'])
                  .subscribe(value2 => {
                    if(value2.headers.get('authorization')) {
                      ApiService.token = value2.headers.get('authorization');
                      resolve(true);
                    }
                  }, error => {
                    reject(error);
                  })
              }).catch(err => {
              reject(err)
            });
          })
        }
      });
    })
  }

  signMessage(publicAddress, nonce) {
    return new Promise((resolve, reject) =>
      window.web3.personal.sign(
        Web3Service.web3.fromUtf8(`Log in NeoPlace (nonce: ${nonce})`),
        publicAddress,
        (err, signature) => {
          if (err) return reject(err);
          return resolve({ publicAddress: publicAddress, signature: signature });
        }
      )
    );
  }

  signup(publicAddress) {
    return this.apiService.post("subscribe/signup", {publicAddress: publicAddress});
  }

  authenticate(publicAddress, signature) {
    return this.apiService.postFull("login", {pubKey: publicAddress, signature: signature});
  }






}
