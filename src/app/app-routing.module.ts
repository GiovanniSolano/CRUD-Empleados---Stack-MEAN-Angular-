import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditEmpleadoComponent } from './components/add-edit-empleado/add-edit-empleado.component';
import { ListEmpleadoComponent } from './components/list-empleado/list-empleado.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ListEmpleadoComponent},
  { path: 'add-empleado', component: AddEditEmpleadoComponent},
  { path: 'edit-empleado/:id', component: AddEditEmpleadoComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
