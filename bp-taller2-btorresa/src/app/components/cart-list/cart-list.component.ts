import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Cart } from '../../models/cart.model';
import { Store } from '@ngrx/store';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DISCOUNT_CODES } from 'src/app/constants/discount-codes';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  itemsInCart: Cart[];
  subtotal: number = 0;
  shipping: number = 0;
  total: number = 0;
  promotionCodes: FormGroup;
  discountCodes = DISCOUNT_CODES;
  appliedCodes = [];

  constructor(
    private _cartService: CartService,
    private _formBuilder: FormBuilder,
    private _store: Store<{ cart: { items: Cart[] } }>,
  ) {
    this.createPromotionCodesForm();
  }

  ngOnInit(): void {
    this.getBooksInCart();
  }
  
  getBooksInCart() {
    this._cartService.getAllItemsInCart().subscribe((response) => {
      this.itemsInCart = response;

      if (response.length > 0) {
        this.calculateTotal();
      }
    });
  }

  removeBook(bookId: number, index: number) {
    this._cartService.deleteItemInCart(bookId).subscribe(() => {
      this.itemsInCart.splice(index, 1);
      this.calculateSubtotal();
    });
  }

  increase(bookInCart: Cart, index: number) {
    this.itemsInCart[index].quantity = bookInCart.quantity + 1;
    this.calculateTotal();
  }

  decrease(bookInCart: Cart, index: number) {
    if (bookInCart.quantity > 1) {
      this.itemsInCart[index].quantity = bookInCart.quantity - 1;
    }
    this.calculateTotal();
  }

  calculateSubtotal(): number {
    return this.itemsInCart.reduce((accumulator, currentValue) => {
      return accumulator + currentValue?.price * currentValue?.quantity;
    }, 0);
  }

  calculateDiscounts(): number {
    return this.appliedCodes.reduce((accumulator, currentValue) => {
      return accumulator + currentValue?.amount;
    }, 0);
  }

  calculateTotal() {
    this.subtotal = this.calculateSubtotal();
    this.shipping = this.subtotal > 100 ? 5 : 0;
    this.total = this.subtotal + this.shipping - this.calculateDiscounts();
  }

  createPromotionCodesForm() {
    this.promotionCodes = this._formBuilder.group({
      codes: new FormArray([
        this.addPromotionCode(),
        this.addPromotionCode(),
        this.addPromotionCode()
      ]),
    });
  }

  get codes() {
    return this.promotionCodes.controls['codes'] as FormArray;
  }

  addPromotionCode() {
    return this._formBuilder.group({
      code: [null, Validators.compose([
        Validators.required,
        this.inArrayValidator(this.discountCodes)
      ])],
      applied: [false]
    });
  }

  validateCode(index: number) {
    const code = this.codes['controls'][index];
    code.patchValue({
      applied: true,
    });

    if (code['controls'].code.errors === null) {
      const appliedCode = this.discountCodes.find(discount => {
        return code['controls'].code.value?.match(discount.validation)
      });

      if (this.appliedCodes.indexOf(appliedCode) === -1) {
        this.appliedCodes.push(appliedCode);
      }
    }

    this.calculateTotal();
  }

  inArrayValidator(array: { name: string, amount: number, validation: RegExp }[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (array.find(discount => value?.match(discount.validation))) {
        return null; // Valor válido
      } else {
        return { notInArray: true }; // Valor no válido
      }
    };
  }
}
