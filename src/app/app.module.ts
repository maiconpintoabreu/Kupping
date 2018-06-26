import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './students/students.component';
import { ClassesComponent } from './classes/classes.component';
import { DanceStyleComponent } from './dance-style/dance-style.component';
import { DashboardItemComponent } from './dashboard-item/dashboard-item.component';
import { AgmCoreModule } from '@agm/core';
import { AdminComponent } from './admin/admin.component';
import { FormStudentsComponent } from './students/form-students.component';
import { FormClassesComponent } from './classes/form-classes.component';
import { StudentService } from './services/student.service';
import { HttpClientModule } from '@angular/common/http';
import { CloseMenu } from './directives/close-menu';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    StudentsComponent,
    ClassesComponent,
    DanceStyleComponent,
    DashboardItemComponent,
    AdminComponent,
    FormStudentsComponent,
    FormClassesComponent,
    CloseMenu
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDZ3J5mDE4rBJiiqi0ZNiM8RKWIv76Uu4o'
    })
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
