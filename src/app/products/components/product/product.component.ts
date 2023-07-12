import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() data!: Product
  @Output() item = new EventEmitter()
  addButton: boolean = false;
  amount: number = 0;

  constructor() {

  }
  ngOnInit(): void {

  }
  add() {
    this.item.emit({ item: this.data, quantity: this.amount })
  }
}
