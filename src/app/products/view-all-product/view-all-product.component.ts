import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-all-product',
  templateUrl: './view-all-product.component.html',
  styleUrls: ['./view-all-product.component.scss']
})
export class ViewAllProductComponent implements OnInit {
productList: Product | any ;
  constructor(private productService: ProductService,private router: Router) { }

  ngOnInit(): void {
    this.productService.viewAllProduct().subscribe(data =>{
      this.productList = data;
    })
  }
  cardClick(data){
    console.log(data);
    this.router.navigate(['/', 'products','view-product',data]);
  }
}
