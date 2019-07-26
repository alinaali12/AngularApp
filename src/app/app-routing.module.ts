import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { InputFormComponent } from './input-form/input-form.component';
import { EditComponent } from './edit/edit.component';
import { ErrorComponent } from './error/error.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'',component: LoginPageComponent},
  { path: 'input', component: InputFormComponent, canActivate:[AuthGuard] },
  { path: 'table', component: TableComponent, canActivate:[AuthGuard] },
  { path: 'edit', component: EditComponent, canActivate:[AuthGuard]},
  {path: 'error',component: ErrorComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
