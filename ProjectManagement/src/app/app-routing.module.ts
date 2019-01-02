import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './UI/add-user/add-user.component';
import { AddTaskComponent } from './UI/add-task/add-task.component';
import { ViewTaskComponent } from './UI/view-task/view-task.component';
import { AddProjectComponent } from './UI/add-project/add-project.component';

const routes: Routes = [
  { path: 'adduser', component: AddUserComponent, runGuardsAndResolvers: 'always' },
  { path: 'adduser/:id', component: AddUserComponent, runGuardsAndResolvers: 'always' },
  { path: 'addtask', component: AddTaskComponent },
  { path: 'addtask/:id', component: AddTaskComponent },
  { path: 'viewtask', component: ViewTaskComponent },
  { path: 'addproject', component: AddProjectComponent },
  { path: 'addproject/:id', component: AddProjectComponent },
  { path: '', component: AddProjectComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [AddUserComponent, AddTaskComponent, ViewTaskComponent, AddProjectComponent];
