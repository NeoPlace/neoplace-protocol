import { Injectable } from '@angular/core';

declare const Buffer;
declare var require: any;
const ipfsAPI = require('ipfs-api');

export const environment = {
  production: false,
  Node: "ipfs.infura.io",
  Gateway: "https://ipfs.infura.io/ipfs/"
};

declare var window: any;

@Injectable()
export class IpfsService {

	public ipfsApi: any;

	public gateway = environment.Gateway;

  constructor() {
    this.ipfsApi = ipfsAPI({host: environment.Node, port: '5001', protocol: 'https'});
  }

  addData(data) {
    let ipfsId;
    const buffer = new Buffer(data);
    return this.ipfsApi.add(buffer)
      .then((response) => {
        console.log(response);
        ipfsId = response[0].hash;
        console.log(ipfsId);
        return ipfsId;
      }).catch((err) => {
        console.error(err);
      });
  }

  addFile(file) {
    return new Promise((resolve, reject) => {
      let reader = new window.FileReader();
      reader.onloadend = () => resolve(reader);
      reader.readAsArrayBuffer(file);
    });
  }

  saveToIpfs (reader) {
    let ipfsId;
    const buffer = new Buffer(reader.result);
    return this.ipfsApi.add(buffer)
      .then((response) => {
        ipfsId = response[0].hash;
        return ipfsId;
      }).catch((err) => {
      console.error(err);
    });
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}


