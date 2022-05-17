import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import * as data from '../../../assets/data/db.json';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PopUpComponent } from 'src/app/shared/pop-up/pop-up.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  addProductForm :  FormGroup
  prodData =(<any>data);
  newId:any;
  imagePath:any;
  erroMsg: Boolean = false;
  newProduct: any;
  constructor(private productService: ProductService,private router: Router,private fb: FormBuilder,
    private  dialogRef : MatDialog) {
    console.log("size",this.prodData.product[this.prodData.product.length -1].id);
    this.newId = this.prodData.product[this.prodData.product.length -1].id;
    }
 
  ngOnInit(): void {
    this.addProductForm =  this.fb.group({ //added now
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
        Validators.pattern("^[1-9][0-9]{1,10}$")
      ]),
     })
  }
  imgPath(data){
    // console.log(data);
    this.imagePath = data;
    this.erroMsg = false;
  }
  setValue(){
    console.log(this.addProductForm.value);
  }
  addNewProduct(form:any){
    if(this.imagePath){
      this.openDialog();
      console.log(form.value);
      let newProduct = {
        id: this.newId + 1,
        categoryId: form.value.categoryId,
        productName: form.value.productName,
        descriptions: form.value.description,
        rating: form.value.rating,
        price:form.value.price,
        productImg: this.imagePath,
        isAvailable: 1,
        color: form.value.color
      };
      console.log("add",newProduct);
     this.newProduct = newProduct;
    }
    else{
      this.erroMsg = true;
    }
   
  }
  openDialog(){
    const dialogRef = this.dialogRef.open(PopUpComponent,{
      data : {
       msg : "Added Successfully"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.productService.createProduct(this.newProduct).subscribe(data=>
        {
          console.log(data)
          // alert("Added Successfully");
         
          this.router.navigate(['/products']);
          
        });
    });
  }
}
