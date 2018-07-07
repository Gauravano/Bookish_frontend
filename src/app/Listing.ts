export class Listing {
  id: number;
  book_name: string;
  author_name: string;
  price: number;
  condition: string;
  userId: number;
  book_image_url;
  user_name;

  constructor(book_name, author_name, price, condition, userId, book_image_url, user_name ) {
    this.book_name = book_name;
    this.author_name = author_name;
    this.condition = condition;
    this.price = price;
    this.userId = userId;
    this.book_image_url = book_image_url;
    this.user_name = user_name;
  }
}
