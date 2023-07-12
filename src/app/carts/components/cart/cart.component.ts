import { CartService } from './../../services/cart.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(private _service: CartService) {}

  cartProducts: any[] = []
  total: any = 0
  success: boolean = false

  ngOnInit() {
    this.getCartProduct()
  }
  getCartProduct() {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
    }
    this.getTotalCart()
  }
  addAmount(index: number) {
    this.cartProducts[index].quantity++
    this.getTotalCart()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))

  }
  minusAmount(index: number) {
    this.cartProducts[index].quantity--
    this.getTotalCart()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))

  }
  detectChange() {
    this.getTotalCart()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }
  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1)
    this.getTotalCart()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }
  clearCart() {
    this.cartProducts = []
    this.getTotalCart()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))

  }
  getTotalCart() {
    this.total = 0
    for (let x in this.cartProducts) {
      this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity
    }
  }
  addCart() {
    let products = this.cartProducts.map(item => {
      return { productId: item.id, quantity: item.quantity }
    })
    let Model = {
      userId: 5,
      date: new Date(),
      products: products
    }
    this._service.creatNewCart(Model).subscribe(res => {
      this.success = true
      // this.clearCart()
    })
  }

}
