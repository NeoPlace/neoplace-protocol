import {Injectable} from "@angular/core";



@Injectable()
export class RequestService {

  constructor() {

  }

  generateRequest(type, content) {
    let request = {};
    request['type'] = type;
    request['content'] = content;
    return request;
  }
}
