import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PopUpComponent } from 'src/app/shared/pop-up/pop-up.component';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit,OnChanges  {
  updateProductForm :  FormGroup
  productID: any = 0;
  productDetails: Product | any;
  imagePath:any;
  localUrl:any;
  uploadImg:Boolean = false;
  isDisable:Boolean = false;
  erroMsg: Boolean = false;
  errorMessage:string = '';
  updatedProduct: any;
  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private  dialogRef : MatDialog) {
   
     }

  ngOnInit(): void {
    this.updateProductForm =  this.fb.group({ //added now
      'productName' : new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-zA-Z-/\x20/g]{3,20}$")
      ]),
      'categoryId' : new FormControl('',[
        Validators.required,
        Validators.pattern("^[1-4]{1}$")
      ]),
      'description' : new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ]),
      'rating' : new FormControl(),
      'color' : new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ]),
      'isAvailable' : new FormControl(),
      'price' : new FormControl('',[
        Validators.required,
        Validators.pattern("^[0-9]{1,10}((\.)[0-9]{0,2}){0,1}$")
      ]),
    })

    this.activatedRoute.params.subscribe(data => {

      this.productID = data['id'];
      this.productService.viewProduct(this.productID).subscribe(productData => {
        this.productDetails = productData;
        console.log(this.productDetails);
        console.log(this.updateProductForm.value);
        this.updateProductForm.setValue({
          productName : this.productDetails.productName,
          categoryId : this.productDetails.categoryId,
          description : this.productDetails.descriptions,
          rating : this.productDetails.rating,
          color : this.productDetails.color,
          isAvailable : this.productDetails.isAvailable,
          price : this.productDetails.price
        });
        // this.updateProductForm.forEach(element => {
          
        // });
        this.localUrl = this.productDetails.productImg;
      });
    });
    this.productService.getJSON().subscribe(data => {
      console.log("...........",data);
    });
    this.updateProductForm.valueChanges.subscribe(data => {this.erroMsg = false;
      this.errorMessage= '';} );
  }
  ngOnChanges(): void {
    this.erroMsg = false;
    this.errorMessage= '';
  }
  onUpload(){
    this.uploadImg = true;
  }
  imgPath(data){
    // console.log(data);
    this.imagePath = data;
  }
  updateProduct(form: any) {
    console.log(form);
   
    if(form.status == "VALID"){
      this.openDialog();
      let imgURL ;
      imgURL = this.imagePath ? this.imagePath : this.localUrl;
      const updateProduct = {
        id: form.value.id,
        categoryId: form.value.categoryId,
        productName: form.value.productName,
        descriptions: form.value.description,
        rating: form.value.rating,
        price: form.value.price,
        productImg: imgURL,
        isAvailable: form.value.isAvailable,
        color: form.value.color,
      };
      console.log("updateProduct", updateProduct);
      this.updatedProduct = updateProduct;
      
    }else{
      this.erroMsg = true;
      if(!this.localUrl && !this.imagePath){
        this.errorMessage= 'Please choose a product image.';
      }
      else
      this.errorMessage= 'Please enter valid details.';
    

    }
   
  }
  openDialog(){
    const dialogRef =  this.dialogRef.open(PopUpComponent,{
      data : {
       msg : "Updated Successfully"
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.productService.updateProduct(this.productID,this.updatedProduct).subscribe(data => {
        console.log(data);
        // this.router.navigate(['/products']);
      });
   
    });
  }
}


