import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { Cart } from '../models/cart.model';

export interface CartState {
  items: Cart[];
}

const initialState: CartState = {
  items: []
};

export const cartReducer = createReducer(
  initialState,

  on(CartActions.increaseQuantity, (state, { bookId }) => ({
    ...state,
    items: state.items.map(item => item.id === bookId ? { ...item, quantity: item.quantity + 1 } : item)
  })),

  on(CartActions.decreaseQuantity, (state, { bookId }) => ({
    ...state,
    items: state.items.map(item => item.id === bookId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item)
  }))
);
