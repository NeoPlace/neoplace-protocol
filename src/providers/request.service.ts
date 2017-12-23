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

  processRequest(requestContent) {
    let content = requestContent.replace('neoplace', '');
    var decrypted = CryptoJS.AES.decrypt(content, this.key);
    var c = decrypted.toString(CryptoJS.enc.Utf8);
    let request = JSON.parse(c);

    if(request.type) {
      switch(request.type) {
        case "pay": {
          //DONE
          break;
        }
        case "pay-fiat": {
          //DONE
          break;
        }
        case "pay-article": {
          //DONE
          break;
        }
        case "pay-service": {
          //DONE
        }
        case "order-service": {
          //DONE
          break;
        }

      }
    }

  }
}
