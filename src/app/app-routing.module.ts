import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { InputFormComponent } from './input-form/input-form.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'input', component: InputFormComponent },
  { path: 'table', component: TableComponent },
  { path: 'edit', component: EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
