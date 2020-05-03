import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterNewUserComponent } from './register-new-user/register-new-user.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent} from './user-profile/user-profile.component';


const routes: Routes = [
  { path: 'register', component: RegisterNewUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users/:userId', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
