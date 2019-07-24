import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DispalyemployeeComponent } from './dispalyemployee/dispalyemployee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { UploadComponent } from './upload/upload.component';

const appRoutes: Routes = [
  { path: 'create-user', component: CreateEmployeeComponent },
  { path: 'display-user', component: DispalyemployeeComponent },

  { path: 'update-user/:id', component: UpdateUserComponent },
  { path: 'delete-user/:id', component: DeleteUserComponent },
  { path: 'upload-user', component: UploadComponent },
  // { path: '',
  //   redirectTo: '/create-user',
  //   pathMatch: 'full'
  // }
  
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
