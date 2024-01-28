import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  @Input() book: Book;
  @Output() sendBookToCart: EventEmitter<Book> = new EventEmitter();

  constructor() {}

  addBookToCart(book: Book) {
    this.sendBookToCart.emit(book);
  }
}
