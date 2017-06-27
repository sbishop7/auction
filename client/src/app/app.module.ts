import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserService } from './user/user.service';
import { BidComponent } from './bid/bid.component';
import { ResultComponent } from './result/result.component';
import { ProductComponent } from './bid/product/product.component';
import { ProductService } from './bid/product/product.service';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    BidComponent,
    ResultComponent,
    ProductComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [UserService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
