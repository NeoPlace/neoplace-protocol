import { Injectable } from '@angular/core';

declare var window: any;

const Web3 = require('web3');

// initialize web3
const ProviderEngine = require('web3-provider-engine');
const CacheSubprovider = require('web3-provider-engine/subproviders/cache.js');
const FixtureSubprovider = require('web3-provider-engine/subproviders/fixture.js');
const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js');
const VmSubprovider = require('web3-provider-engine/subproviders/vm.js');
const NonceSubprovider = require('web3-provider-engine/subproviders/nonce-tracker.js');
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js');
const WalletSubprovider = require('ethereumjs-wallet/provider-engine');
const walletFactory = require('ethereumjs-wallet');
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

    //Wallet Initialization
    var privateKey = "3a1076bf45ab87712ad64ccb3b10217737f7faacbf2872e88fdd9a537d8fe266"
    var privateKeyBuffer = new Buffer(privateKey, "hex")
    var myWallet = walletFactory.fromPrivateKey(privateKeyBuffer)

    //Engine initialization & sub-provider attachment

    var engine = new ProviderEngine();

    engine.addProvider(new FixtureSubprovider({
      web3_clientVersion: 'ProviderEngine/v0.0.0/javascript',
      net_listening: true,
      eth_hashrate: '0x00',
      eth_mining: false,
      eth_syncing: true,
    }))

    // cache layer
    engine.addProvider(new CacheSubprovider())

    // filters
    engine.addProvider(new FilterSubprovider())

    // pending nonce
    engine.addProvider(new NonceSubprovider())

    // vm
    engine.addProvider(new VmSubprovider())

    // Here the URL can be your localhost for TestRPC
    engine.addProvider(new RpcSubprovider({
      rpcUrl: 'YOUR RPC URL',
    }))

    // Wallet Attachment
    engine.addProvider(new WalletSubprovider(myWallet))

    // network connectivity error
    engine.on('error', function(err){
      // report connectivity errors
      console.error(err.stack)
    })

    // start polling for blocks
    engine.start()

    //Actual Initialization of the web3 module
    this.web3 = new Web3(engine)
  }

}
