import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { PacijentComponent } from './pacijent/pacijent.component';
import { LekarComponent } from './lekar/lekar.component';
import { MenadzerComponent } from './menadzer/menadzer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselModule } from "@syncfusion/ej2-angular-navigations";
import { PretragaComponent } from './pretraga/pretraga.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { MenadzerLoginComponent } from './menadzer-login/menadzer-login.component';
import { MenadzerHomeComponent } from './menadzer-home/menadzer-home.component';
import { MenadzerInsertLekarComponent } from './menadzer-insert-lekar/menadzer-insert-lekar.component';
import { UserGuardGuard } from './user-guard.guard';
import { LekarGuard } from './lekar.guard';
import { MenadzerGuard } from './menadzer.guard';
import { GuestGuard } from './guest.guard';
import { LekarProfilComponent } from './lekar-profil/lekar-profil.component';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { ProfilUserViewComponent } from './profil-user-view/profil-user-view.component';
import { ProfilLekarViewComponent } from './profil-lekar-view/profil-lekar-view.component';
import { PreglediEditLekarComponent } from './pregledi-edit-lekar/pregledi-edit-lekar.component';
import { RaznoLekarComponent } from './razno-lekar/razno-lekar.component';
import { PreglediLekarComponent } from './pregledi-lekar/pregledi-lekar.component';
import { PreglediUserComponent } from './pregledi-user/pregledi-user.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    UserComponent,
    PacijentComponent,
    LekarComponent,
    MenadzerComponent,
    CarouselComponent,
    PretragaComponent,
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    MenadzerLoginComponent,
    MenadzerHomeComponent,
    MenadzerInsertLekarComponent,
    LekarProfilComponent,
    UserProfilComponent,
    PasswordChangeComponent,
    ProfilUserViewComponent,
    ProfilLekarViewComponent,
    PreglediEditLekarComponent,
    RaznoLekarComponent,
    PreglediLekarComponent,
    PreglediUserComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CarouselModule,
    ReactiveFormsModule
  ],
  providers: [
    UserGuardGuard,
    LekarGuard,
    MenadzerGuard,
    GuestGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
