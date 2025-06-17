import { Component } from '@angular/core';

@Component({
  selector: 'shop',
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  products = [
    { id: 'tshirt', name: 'T-Shirt Knot Poet', image: 'img/shop/tshirt.png', price: '20€' },
    { id: 'cd', name: 'CD "Singularity"', image: 'img/shop/cd.png', price: '15€' },
    { id: 'poster', name: 'Poster Edizione Limitata', image: 'img/shop/poster.png', price: '10€' },
  ];
}
