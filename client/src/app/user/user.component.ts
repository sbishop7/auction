import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"

import { User } from "./user"
import { UserService } from "./user.service"

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  username= ""

  constructor( private _user_service: UserService, private _router: Router ) { }

  ngOnInit() {
  }

  login(){
    // console.log("Username is... " + this.username)
    this._user_service.login(this.username)
      .then(() => { this._router.navigate(["/bids"]) })
      .catch(() => console.log("Couldn't log in"))
  }
}
