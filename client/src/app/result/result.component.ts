import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"

import { UserService } from "./../user/user.service"
import { ProductService } from "./../bid/product/product.service"
import { Product } from "./../bid/product/product";
import { Bid } from './../bid/product/bid'

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  user = {username: "", user_id: ""}
  products: Array<Product> = []
  finalBids: Array<Product> = []

  constructor( private _userService: UserService, private _router: Router, private _productService: ProductService ) { }

  ngOnInit() {
    this._userService.check_status()
      .then((data) => {
        if(data){
          this.user.username = data.username
          this.user.user_id = data.user_id
        }
      })
      .catch(() => this._router.navigate(["/login"]) )

    this._productService.all_products()
        .then( data => {
          this.products = data
        })
        .catch (err => { console.log("error retrieving products", err);})

    for(var i=0; i<this.products.length; i++){
      let thisProduct = new Product()
      
      let highestBid = new Bid()
      thisProduct.product_name = this.products[i].product_name
      for(var j=0; j<this.products[i].bids.length; j++){
        let highBid = 0
        if(this.products[i].bids[j].amount > highestBid.amount ){
          highestBid = this.products[i].bids[j]
        }
      }
      thisProduct.bids.push(highestBid)
      this.products.push(thisProduct)
    }
    
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
  startBid(){
    console.log("restarting bid")
    for(var i = 0; i<this.products.length; i++){
      this.products[i].bids = []
      // for(var j=0; j<this.products[i].bids.length; j++){
      //   this.products[i].bids.pop()
      // }
      this._productService.clear_bids(this.products[i])
          .then(() => {console.log("bids cleared")})
          .catch(() => console.log("couldn't clear bids"))
    }
    this._router.navigate(['/bids'])
  }
  
}
