import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './UI/add-user/add-user.component';
import { AddProjectComponent } from './UI/add-project/add-project.component';
import { AddTaskComponent } from './UI/add-task/add-task.component';
import { ViewTaskComponent } from './UI/view-task/view-task.component';
import { ViewUserComponent } from './UI/view-user/view-user.component';
import { ViewProjectComponent } from './UI/view-project/view-project.component';
import { TaskfilterPipe } from './UI/view-task/taskfilter.pipe';
import { UserfilterPipe } from './UI/view-user/userfilter.pipe';
import { ProjectfilterPipe } from './UI/view-project/projectfilter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    AddProjectComponent,
    AddTaskComponent,
    ViewTaskComponent,
    ViewUserComponent,
    ViewProjectComponent,
    TaskfilterPipe,
    UserfilterPipe,
    ProjectfilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
