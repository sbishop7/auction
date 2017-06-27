import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { BidComponent } from './bid/bid.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: '', pathMatch: "full", redirectTo: '/login' },
  { path: 'login', component: UserComponent },
  { path: 'bids', component: BidComponent},
  { path: 'result', component: ResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
