export class Listing {
  id: number;
  book_name: string;
  author_name: string;
  price: number;
  condition: string;
  userId: number;

  constructor(book_name, author_name, price, condition, userId ) {
    this.book_name = book_name;
    this.author_name = author_name;
    this.condition = condition;
    this.price = price;
    this.userId = userId;
  }
}
