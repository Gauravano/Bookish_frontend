export class Message {
  id: number;
  senderId: number;
  content: string;
  listingId: number;
  createdAt: DateTimeFormat;

  constructor(id, senderId, content, listingId, createdAt) {
    this.id = id;
    this.content = content;
    this.listingId = listingId;
    this.createdAt = createdAt;
    this.senderId = senderId;
  }
}
