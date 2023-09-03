import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { LogOutComponent } from './log-out/log-out.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routeConfig: Routes = [
  {
    path: 'signIn',
    component: SignInComponent,
    title: 'Sign In Page'
  },
  {
    path: "",
    component: HomeComponent,
    title: "Home Page"
  },
  {
    path: 'logout', component: LogOutComponent,
    title: 'LogOut Page '
  },
  {
    path: 'userProfile', component: UserProfileComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not Found Page'
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routeConfig, { onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {

  constructor(){
    window.location.reload
  }
}
