import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";
import {Message} from "./model/message";

@Injectable()
export class MessageService {
  constructor() {

  }

  getDiscussions(uid: string){
  }

  saveDiscussions(uidFrom: string, uidTo: string) {
  }

  saveMessage(uidFrom: string, uidTo: string, message: string) {
    let alphaArray:Array<string> = [uidFrom, uidTo];
    let sortedArray:Array<string> = alphaArray.sort();

    let messageObject: Message = <Message>{
      from: uidFrom,
      to: uidTo,
      date: Date.now(),
      message: message
    }
  }

  getMessages(discussionId: string) {
  }

}
