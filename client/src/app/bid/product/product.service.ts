import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Product } from "./product";

import "rxjs"

@Injectable()
export class ProductService {

  constructor(private _http: Http) { }
    all_products(){
      return this._http.get("/all_products")
                .map(data => data.json())
                .toPromise()
    }
    add_bid(product: Product){
      return this._http.post('/add_bid', product).toPromise()
    }
    add(newProduct: Product){
      return this._http.post("/add_product", newProduct).toPromise()
    }
    clear_bids(product: Product){
      return this._http.post('/clear_bids', product).toPromise()
    }
    delete_product(product: Product){
      return this._http.post('/delete_product', product).toPromise()
    }
}
