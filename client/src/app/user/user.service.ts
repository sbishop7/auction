import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

import "rxjs"

@Injectable()
export class UserService {

  constructor( private _http: Http ) { }
    login(name: string){
      return this._http.post("/login", {username: name}).toPromise()
    }

    check_status(){
      return this._http.get("/check_status")
              .map(data => data.json())
              .toPromise()
    }

    logout(){
    return this._http.get('/logout')
              .map( data => data.json() )
              .toPromise();
  }
}
