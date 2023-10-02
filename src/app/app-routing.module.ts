import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HOME} from "@angular/cdk/keycodes";
import {HomeComponent} from "./components/home/home.component";
import {RecordsComponent} from "./components/records/records.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'records', component:RecordsComponent},

  {path: '**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
