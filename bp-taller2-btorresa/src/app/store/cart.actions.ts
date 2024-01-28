import { createAction, props } from '@ngrx/store';
import { Cart } from '../models/cart.model';

export const increaseQuantity = createAction('[Cart] Increase Quantity', props<{ bookId: number }>());

export const decreaseQuantity = createAction('[Cart] Decrease Quantity', props<{ bookId: number }>());