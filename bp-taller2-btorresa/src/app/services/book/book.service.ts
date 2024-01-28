import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Book } from 'src/app/models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private _httpClient: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    return this._httpClient.get<Book[]>('/api/books');
  }

  
}
