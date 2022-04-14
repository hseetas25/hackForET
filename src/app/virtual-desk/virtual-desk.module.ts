import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { VirtualDeskRoutingModule } from './virtual-desk-routing.module';
import { FacultyLoginComponent } from './components/faculty-login/faculty-login.component';
import { StudentLoginComponent } from './components/student-login/student-login.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FacultyRegistrationComponent } from './components/faculty-registration/faculty-registration.component';


@NgModule({
  declarations: [
    FacultyLoginComponent,
    StudentLoginComponent,
    HomeComponent,
    RegistrationComponent,
    PageNotFoundComponent,
    FacultyRegistrationComponent
  ],
  imports: [
    CommonModule,
    VirtualDeskRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class VirtualDeskModule { }
