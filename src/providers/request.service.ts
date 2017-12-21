import {Injectable} from "@angular/core";
import * as CryptoJS from 'crypto-js';



@Injectable()
export class RequestService {
  private key: string = 'TODO CHANGE';

  constructor() {

  }

  generateRequest(type, content) {
    let request = {};
    request['type'] = type;
    request['content'] = content;
    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(request), this.key);
    var encryptedmessage = 'neoplace' + encrypted.toString();
    return encryptedmessage;
  }
}
