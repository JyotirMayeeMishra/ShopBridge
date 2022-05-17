import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../site-layout/category';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { 
    this.getJSON().subscribe(data => {
      console.log(data);
  });
  }
  public getJSON(): Observable<any> {
    return this.httpClient.get("../assets/data/db.json");
  }
  createProduct(productBody: any):Observable<Product>{
   const baseUrl = "http://localhost:3000/product";
   return this.httpClient.post<Product>(baseUrl,productBody);
  }
  viewAllProduct():Observable<Product>{
    const baseUrl = "http://localhost:3000/product/";
    return this.httpClient.get<Product>(baseUrl);
   }
   viewProduct(productId:any):Observable<Product>{
    const baseUrl = "http://localhost:3000/product/"+productId;
    return this.httpClient.get<Product>(baseUrl);
   }
   updateProduct(productId: any,productBody :any):Observable<Product>{
    const baseUrl = "http://localhost:3000/product/"+productId;
    return this.httpClient.put<Product>(baseUrl,productBody);
   }
   deleteProduct(productId: any):Observable<Product>{
    const baseUrl = "http://localhost:3000/product/"+productId;
    return this.httpClient.delete<Product>(baseUrl);
   }
   searchCategoryProduct(categoryId: any):Observable<Product>{
    const baseUrl = "http://localhost:3000/product?categoryId="+categoryId;
    return this.httpClient.get<Product>(baseUrl);
   }
   searchDateProduct(dateParam: any):Observable<Product>{
    const baseUrl = "http://localhost:3000/product/"+dateParam;
    return this.httpClient.get<Product>(baseUrl);
   }
   getCategory(){
    const categoryUrl = "http://localhost:3000/categories";
     return this.httpClient.get<Category>(categoryUrl);
   }
}
