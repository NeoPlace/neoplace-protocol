# Getting Started
## SCM

```
git clone https://github.com/NeoPlace/neoplace.core.git
```
Current branch is: master

## Prerequisites
Following development tools are required to run this project

```
* GIT
* Eclipse / IntelliJ IDEA (IDE)
* Node 8 with npm 5
* angular-cli
* ionic for native app
* Android studio for Android native app
* Xcode for iOS native app
```

## Hierarchy
```
app
  app.component
  app.module
  ...           # entry point for angular app and configuration files
components
pages           # frontend HTML/CSS views
  home
  article
  service
  pay
pipes
providers       # useful class
  model
  ...
package.json
config.xml      # for mobile native app
README.md 
```

# Build

This project use npm and angular-cli >= 1.5.x for the build.
```
npm install
npm run build
or
npm start # if you want to test in live
```

# Architecture
We are building NeoPlace on top of Ethereum and IPFS.
## Global architecture

![alt text](./architecture.png)

## How data is stored

![alt text](./storage.png)

# How your wallet is generated
## Bitcoin
```
var bitcoin = require("bitcoinjs-lib");
var keyPair = bitcoin.ECPair.makeRandom();
console.log(keyPair.getAddress());
console.log(keyPair.toWif());
// next step with BIP39
```

## Ethereum
```
var ethereumw = require('ethereumjs-wallet');
var wallet = ethereumw.generate();
console.log("wallet.getAddressString()");
console.log("wallet.getPrivateKeyString()");
// next step use https://github.com/ConsenSys/eth-lightwallet
```
## Neo

##
