import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';
import { LekarService } from '../lekar.service';
import { Lekar } from '../model/lekar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router,private lekarService:LekarService) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  message: string;


  login(){
    
    this.userService.login(this.username, this.password).subscribe((userFromDB: User)=>{
      if(userFromDB!=null){
          sessionStorage.setItem('username',this.username);
          sessionStorage.setItem('type','user');
          this.router.navigate(['home']);
      }
      else{
        this.lekarService.login(this.username,this.password).subscribe((userFromDB:Lekar)=>{
          if(userFromDB!=null){
            
            sessionStorage.setItem('username',this.username);
            sessionStorage.setItem('type','lekar');
            this.router.navigate(['profil-lekar-view']);
        }
        else{
          this.message="Neispravni podaci!"
        }
        })
      }
    })
    
  }

}
