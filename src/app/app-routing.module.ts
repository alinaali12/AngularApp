import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { InputViewComponent } from './input-view/input-view.component';
import { DefaultpageComponent } from './defaultpage/defaultpage.component';
import { OutputviewComponent } from './outputview/outputview.component';

const routes: Routes = [
  {path:'defaultpage',component:DefaultpageComponent},
  {path:'',component:DefaultpageComponent},
  {path:'inputview',component:InputViewComponent},
  {path:'outputview',component:OutputviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
