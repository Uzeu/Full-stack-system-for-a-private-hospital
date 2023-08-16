import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MenadzerLoginComponent } from './menadzer-login/menadzer-login.component';
import { MenadzerHomeComponent } from './menadzer-home/menadzer-home.component';
import { MenadzerInsertLekarComponent } from './menadzer-insert-lekar/menadzer-insert-lekar.component';
import { LekarComponent } from './lekar/lekar.component';
import { UserGuardGuard } from './user-guard.guard';
import { LekarGuard } from './lekar.guard';
import { GuestGuard } from './guest.guard';
import { LekarProfilComponent } from './lekar-profil/lekar-profil.component';
import { MenadzerGuard } from './menadzer.guard';
import { UserAndGuestGuard } from './user-and-guest.guard';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { UserAndLekarGuardGuard } from './user-and-lekar-guard.guard';
import { ProfilUserViewComponent } from './profil-user-view/profil-user-view.component';
import { ProfilLekarViewComponent } from './profil-lekar-view/profil-lekar-view.component';
import { CommonModule } from '@angular/common';
import { UserAndManagerGuard } from './user-and-manager.guard';
import { LekarAndManagerGuard } from './lekar-and-manager.guard';
import { PreglediEditLekarComponent } from './pregledi-edit-lekar/pregledi-edit-lekar.component';
import { RaznoLekarComponent } from './razno-lekar/razno-lekar.component';
import { PreglediLekarComponent } from './pregledi-lekar/pregledi-lekar.component';
import { PreglediUserComponent } from './pregledi-user/pregledi-user.component';


const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

const routes: Routes = [
  {path:"",redirectTo: '/home', pathMatch: 'full'},
  {path: "login", component:LoginComponent ,canActivate:[GuestGuard]},
  {path: "home", component:HomeComponent ,canActivate:[UserAndGuestGuard]},
  {path: "user", component: UserComponent,canActivate:[UserGuardGuard]},
  {path: "admin", component: AdminComponent,canActivate:[MenadzerGuard]},
  {path:"register",component:RegisterComponent,canActivate:[GuestGuard]},
  {path:"menadzer-login",component:MenadzerLoginComponent,canActivate:[GuestGuard]},
  {path:"menadzer-home",component:MenadzerHomeComponent,canActivate:[MenadzerGuard]},
  {path:"insertLekar",component:MenadzerInsertLekarComponent,canActivate:[MenadzerGuard]},
  {path:"profil-lekar",component:LekarProfilComponent,canActivate:[UserGuardGuard]},
  {path:"password-change",component:PasswordChangeComponent,canActivate:[UserAndLekarGuardGuard]},
  {path:"profil-user-view",component:ProfilUserViewComponent,canActivate:[UserAndManagerGuard]},
  {path:"profil-lekar-view",component:ProfilLekarViewComponent,canActivate:[LekarAndManagerGuard]},
  {path:"pregledi-edit-lekar",component:PreglediEditLekarComponent,canActivate:[LekarGuard]},
  {path:"razno-lekar",component:RaznoLekarComponent,canActivate:[LekarGuard]},
  {path:"pregledi-lekar",component:PreglediLekarComponent,canActivate:[LekarGuard]},
  {path:"pregledi-user",component:PreglediUserComponent,canActivate:[UserGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,routerOptions),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
