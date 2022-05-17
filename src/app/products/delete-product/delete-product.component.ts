import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit {
  productID: any = 0;
  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {

      this.productID = data['id'];
      this.productService.deleteProduct(this.productID).subscribe(deletedData => {
        // this.productDetails = productData;
        console.log("prod has been deleted");
      });
    })
  }

}
