import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../model/user';
import { PretragaComponent } from '../pretraga/pretraga.component';
import { Lekar } from '../model/lekar';
import { LekarService } from '../lekar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],

})
export class NavbarComponent implements OnInit {

  @ViewChild(PretragaComponent) pretragaComponent: PretragaComponent

  constructor(private router: Router, private userService: UserService, private elementRef: ElementRef,private lekarService:LekarService) { }


  tip: string;
  username: string;
  userr: User;
  lekar: Lekar;

  ngOnInit(): void {
    const userType = sessionStorage.getItem('type');
    
    if (!userType) {
      this.tip = 'guest';
    }
    else if (userType == 'user') {
     // this.lekar.firstname='x';
      this.tip = 'user';
    }
    else if (userType == 'lekar') {
      //this.userr.firstname='x';
      this.tip = 'lekar';
    }
    else {
      this.tip = 'menadzer';
    }
    
    if (userType) {

      this.username = sessionStorage.getItem('username');
      if(this.tip=='user'){
      this.userService.dohvatiJednog(this.username).subscribe((data: User) => {
        if (data != null) {
          this.userr = data;
        }
        else {
        }

      })}
      else if(this.tip=='lekar'){
      this.lekarService.dohvatiJednog(this.username).subscribe((data:Lekar)=>{
        if (data != null) {
          this.lekar = data;
        }
        else {
        }

      })}

    }



  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  redirectToSignUp() {
    this.router.navigate(['/register']);
  }

  logOut() {
    sessionStorage.clear();
    this.tip = 'guest';
    this.router.navigate(['/']);
    window.location.reload();
  }

  promeniLozinku() {
    this.router.navigate(['/password-change']);
  }

  prebaciNaLekare(id) {

    if (this.router.url != '/home') {
      this.router.navigate(['/home']).then(() => {
        window.scrollTo({
        top: 500,
        behavior: 'smooth',
    })
      });

      return;
    }

    let x = document.getElementById(id);

    const y = -70;
    const elPos = x.getBoundingClientRect().top;
    const offset = elPos + window.pageYOffset - y;
    window.scrollTo({
      top: offset,
      behavior: 'smooth',
    })

  }

  redirectProfil() {
    if (sessionStorage.getItem('type') == 'user') {
      this.router.navigate(['/profil-user-view']);
    }
    else if (sessionStorage.getItem('type') == 'lekar') {
      this.router.navigate(['/profil-lekar-view']);
    }
  }

  dodajPregled(){
    this.router.navigate(['/razno-lekar']);
  }
  pregledi(){
    this.router.navigate(['/pregledi-lekar']);
  }

  prebaciNaPreglede(){
    this.router.navigate(['/pregledi-user']);
  }
}
