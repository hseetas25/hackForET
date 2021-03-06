import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, NavigationComponent } from './navigation-components';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule }  from '@angular/fire/database';
import { VirtualDeskModule } from './virtual-desk/virtual-desk.module';
import { FooterComponent } from './navigation-components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    VirtualDeskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
