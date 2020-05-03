import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppTopBarComponent } from './app-top-bar/app-top-bar.component';
import { RegisterNewUserComponent } from './register-new-user/register-new-user.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    AppTopBarComponent,
    RegisterNewUserComponent,
    LoginComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
