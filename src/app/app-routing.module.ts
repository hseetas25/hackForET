import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FacultyLoginComponent } from './virtual-desk/components/faculty-login/faculty-login.component';
import { HomeComponent } from './virtual-desk/components/home/home.component';
import { PageNotFoundComponent } from './virtual-desk/components/page-not-found/page-not-found.component';
import { RegistrationComponent } from './virtual-desk/components/registration/registration.component';
import { StudentLoginComponent } from './virtual-desk/components/student-login/student-login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'student-login' , component: StudentLoginComponent },
  { path: 'faculty-login', component: FacultyLoginComponent },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
