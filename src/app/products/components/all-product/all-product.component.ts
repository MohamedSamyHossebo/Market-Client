import { Product } from './../../models/product';
import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss']
})
export class AllProductComponent {
  products: Product[] = [];
  categories: string[] = [];
  cartProducts: any[] = [];
  loading: boolean = false;

  constructor(private _service: ProductsService) {

  }
  ngOnInit(): void {
    this.getProducts()
    this.getCategories()
  }

  getProducts() {
    this.loading = true
    this._service.getAllProducts().subscribe((res: any) => {
      this.products = res
      this.loading = false
    })
  }

  getCategories() {
    this.loading = true
    this._service.getAllCategories().subscribe((res: any) => {
      this.categories = res
      this.loading = false
    })
  }

  filterCategory(event: any) {
    let value = event.target.value;
    (value == "all") ? this.getProducts() : this.getProductsCategory(value)
  }

  getProductsCategory(keyword: string) {
    this.loading = true
    this._service.getProductsByCategory(keyword).subscribe((res: any) => {
      this.products = res
      this.loading = false
    })
  }

  addToCart(event: any) {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
      let exist = this.cartProducts.find(item => item.item.id == event.item.id)
      if (exist) {
        alert("Product is already in your cart")
      } else {
        this.cartProducts.push(event)
        localStorage.setItem("cart", JSON.stringify(this.cartProducts))
      }

    } else {
      this.cartProducts.push(event)
      localStorage.setItem("cart", JSON.stringify(this.cartProducts))
    }
  }

}
