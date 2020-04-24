import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterNewUserComponent } from './register-new-user/register-new-user.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'register', component: RegisterNewUserComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
