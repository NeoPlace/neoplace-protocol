import { Injectable } from '@angular/core';

const ipfsAPI = require('ipfs-api');

export const environment = {
  production: false,
  Node: "your node",
  Gateway: "https://ipfs.io/ipfs/"
};

declare var window: any;

@Injectable()
export class IpfsService {

	public ipfsApi: any;

	public gateway = environment.Gateway;

  constructor() {
    this.ipfsApi = ipfsAPI(environment.Node);
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

}


