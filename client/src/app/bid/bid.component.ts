import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router"


import { UserService } from "./../user/user.service";
import { ProductService } from "./product/product.service";
import { Product } from './product/product';
import { Bid } from './product/bid';
 
@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit {
  user = {username: "", user_id: ""}
  products: Array<Product> = []


  constructor( private _userService: UserService, private _router: Router, private _productService: ProductService ) {
    this._productService.all_products()
        .then( data => {
          this.products = data
        })
        .catch (err => { console.log("error retrieving products", err);})

    if(this.products.length === 0){
      for(var i = 0; i< 3; i++){
        let newProduct = new Product()
        newProduct.product_name = "Product " + (i+1)
        newProduct.bids = []
        this._productService.add(newProduct)
      }
    }
   }

  ngOnInit() {
    this._userService.check_status()
      .then((data) => {
        if(data){
          this.user.username = data.username
          this.user.user_id = data.user_id
        }
      })
      .catch(() => this._router.navigate(["/login"]) )

    
  }

  logout(){
    this._userService.logout()
                    .then(() => {
                      this._router.navigate(['/'])
                    })
                    .catch((err) => {
                      console.log(err)
                      this._router.navigate(['/'])
                    })
  }

  endBid(){
    let doneBidding = true
    for(var i = 0; i<this.products.length; i++){
      if(this.products[i].bids.length === 0){
        doneBidding = false
      }
    }
    if(doneBidding){
      this._router.navigate(['/result'])
    }
    else{
      alert("Cannot end the bid.  One product does not have any bid yet.")
    }
    
  }
}
