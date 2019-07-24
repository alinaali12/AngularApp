import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { InputFormComponent } from './input-form/input-form.component';
import { EditComponent } from './edit/edit.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {path:'',component: TableComponent},
  { path: 'input', component: InputFormComponent },
  { path: 'table', component: TableComponent },
  { path: 'edit', component: EditComponent},
  {path: 'error',component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
