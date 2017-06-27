import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Bid } from './bid';
import { Router } from "@angular/router"

import { UserService } from "./../../user/user.service"
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product;
  highestBid: number = 0;
  user = {username: "", user_id: ""}
  currentBid: number;
  message: string = ""
  search = ""



  constructor( private _userService: UserService, private _router: Router, private _productService: ProductService) { }

  ngOnInit() {
    this._userService.check_status()
      .then((data) => {
        if(data){
          this.user.username = data.username
          this.user.user_id = data.user_id
        }
      })
      .catch(() => this._router.navigate(["/login"]) )

    this.largest_bid()

  }
  largest_bid(){
    if(this.product.bids.length != 0){
      for(var i=0; i< this.product.bids.length; i++){
        if(this.product.bids[i].amount > this.highestBid){
          this.highestBid = this.product.bids[i].amount
        }
      }
    }
  }

  bid(){
    if(Number(this.currentBid) <= Number(this.highestBid)){
      this.message = "Bid amount should be higher than the previous bid"
    }
    else{
      this.message = ""
      let newBid = new Bid();
      newBid.username = this.user.username
      newBid.amount = this.currentBid
      this.product.bids.push(newBid)
      console.log(this.product)
      this._productService.add_bid(this.product)
          .then(() => {console.log("bid added")})
          .catch(() => console.log("couldn't add bid to db"))
      this.currentBid = null
    }
  }
}
