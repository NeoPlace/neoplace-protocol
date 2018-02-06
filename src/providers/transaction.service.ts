import {Injectable} from "@angular/core";
import {Api} from "./api";
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

  signTransactionAbiMethod(amount) {
    const Web3 = require('web3');
    const Tx = require('ethereumjs-tx');

    const provider = new Web3.providers.HttpProvider("http://localhost:8545");
    const web3 = new Web3(provider);

    const account = 'address';
    const privateKey = Buffer.from('private', 'hex');
    const contractAddress = 'contract address';
    const abi = ["YOUR ABI"];

    const contract = new web3.eth.Contract(abi, contractAddress, {
      from: account,
      gasLimit: 3000000,
    });

    const contractFunction = contract.methods.sendEther('amount');

    const functionAbi = contractFunction.encodeABI();

    let estimatedGas;
    let nonce;

    console.log("Getting gas estimate");

    contractFunction.estimateGas({from: account}).then((gasAmount) => {
      estimatedGas = gasAmount.toString(16);

      console.log("Estimated gas: " + estimatedGas);

      web3.eth.getTransactionCount(account).then(_nonce => {
        nonce = _nonce.toString(16);

        console.log("Nonce: " + nonce);
        const txParams = {
          gasPrice: '0x09184e72a000',
          gasLimit: web3.ToHex(500000),
          to: 'address',
          data: functionAbi,
          from: account,
          value: amount,
          nonce: '0x' + nonce
        };

        const tx = new Tx(txParams);
        tx.sign(privateKey);

        const serializedTx = tx.serialize();

        //contract.methods.get().call().then(v => console.log("Value before increment: " + v));

        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt => {
          console.log(receipt);
          //contract.methods.get().call().then(v => console.log("Value after increment: " + v));
        })
      });
    });
  }
}

