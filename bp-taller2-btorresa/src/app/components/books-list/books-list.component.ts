import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book/book.service';
import { CartService } from '../../services/cart/cart.service';
import { Cart } from '../../models/cart.model';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  public books: Book[] = [];
  public booksInCart: Cart[];
  public category: { category: string };

  constructor(
    private _bookService: BookService,
    private _cartService: CartService,
    private _activatedRoute: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    this._activatedRoute.data.subscribe((data: { category: string }) => this.category = data);
    this.getAllBooks();
    this.getItemsInCart();
  }

  getAllBooks() {
    this._bookService.getAllBooks().subscribe((response) => {
      let dataFiltered;
      if (this.category?.category) {
        dataFiltered = response.filter(book => book.category.toLowerCase().includes(this.category.category));
      } else {
        dataFiltered = response;
      }
      this.books = dataFiltered;
    });
  }

  getItemsInCart() {
    this._cartService.getAllItemsInCart().subscribe(
      (booksInCart) => {
        this.booksInCart = booksInCart;
      }
    );
  }

  getBookId(receivedBook: Book) {
    this.getItemsInCart();

    const bookInCart = this.booksInCart.find((book) => book.title === receivedBook.title);

    if (bookInCart) return window.alert('The selected book is alredy on the cart!');

    const bookToAdd = { ...receivedBook };
    delete bookToAdd?.id;

    this._cartService.createItemInCart(bookToAdd).subscribe(() => {
      window.alert(`${bookToAdd.title} successfull added to cart!`)
    });
  }
}
