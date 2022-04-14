import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacultyLoginComponent } from './components/faculty-login/faculty-login.component';
import { FacultyRegistrationComponent } from './components/faculty-registration/faculty-registration.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { StudentLoginComponent } from './components/student-login/student-login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'student-registration', component: RegistrationComponent },
  { path: 'faculty-registration', component: FacultyRegistrationComponent },
  { path: 'student' , component: StudentLoginComponent },
  { path: 'faculty', component: FacultyLoginComponent },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirtualDeskRoutingModule { }
