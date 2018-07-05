import {Message} from './message';

export class MessageSet {
  senderId: number;
  messages: Message[];
  senderName: string;

  constructor(senderId, messages, senderName) {
    this.messages = messages;
    this.senderId = senderId;
    this.senderName = senderName;
  }
}
