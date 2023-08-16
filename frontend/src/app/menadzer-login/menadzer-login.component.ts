import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenadzerService } from '../menadzer.service';
import { Menadzer } from '../model/menadzer';
import { UserService } from '../user.service';
import { LekarService } from '../lekar.service';

@Component({
  selector: 'app-menadzer-login',
  templateUrl: './menadzer-login.component.html',
  styleUrls: ['./menadzer-login.component.css']
})
export class MenadzerLoginComponent implements OnInit {

  constructor(private menadzerService: MenadzerService, private router: Router) { }

  ngOnInit(): void {

  }

  username: string;
  password: string;
  message: string;

  login(){
    this.menadzerService.login(this.username, this.password).subscribe((userFromDB: Menadzer)=>{
      if(userFromDB!=null){
          sessionStorage.setItem('username',this.username);
          sessionStorage.setItem('type','menadzer');
        this.router.navigate(['menadzer-home']);
      }
      else{
        this.message="Neispravni podaci!"
      }
    })
    
  }

}
