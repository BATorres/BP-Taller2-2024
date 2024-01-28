import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './components/books-list/books-list.component';
import { CartListComponent } from './components/cart-list/cart-list.component';

const routes: Routes = [
  {
    path: '',
    component: BooksListComponent,
  },
  {
    path: 'programming',
    component: BooksListComponent,
    data: { category: 'programming' }
  },
  {
    path: 'web-development',
    component: BooksListComponent,
    data: { category: 'web development' }
  },
  {
    path: 'security',
    component: BooksListComponent,
    data: { category: 'security' }
  },
  {
    path: 'cart',
    component: CartListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
