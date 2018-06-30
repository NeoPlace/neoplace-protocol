import { Injectable } from '@angular/core';

declare var require: any;

const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

@Injectable()
export class BitcoinWalletService {

  network: string = "testnet";
  path: string = "m/44'/0'/0'/0/0";

  constructor() {
  }

  generateMnemonic() {
    return bip39.generateMnemonic();
  }

  create(name, mnemonic) {

    const seed = bip39.mnemonicToSeed(mnemonic);

    const master = bitcoin.HDNode.fromSeedBuffer(seed, bitcoin.networks.testnet);
    const derived = master.derivePath(this.path);
    const address = derived.getAddress();
    const wif = derived.keyPair.toWIF();

    return ({
      trigram: "BTC",
      name: name,
      publicAddress: address,
      privateAddress: wif,
      mnemonic: mnemonic
    });
  }
}
