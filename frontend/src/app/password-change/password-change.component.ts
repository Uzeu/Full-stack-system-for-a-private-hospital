import { Component, OnInit } from '@angular/core';
import { LekarService } from '../lekar.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../model/user';
import { Lekar } from '../model/lekar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {
  lozinkaForma: FormGroup
  constructor(private fb: FormBuilder,private userService: UserService, private router: Router,private lekarService:LekarService) {
    this.lozinkaForma = this.fb.group({
      lozinka: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(14), this.jednoVelikoSlovo, this.barJedanBroj, this.barJedanSpecijalniKarakter, this.pocinjeSlovom, this.bezDuplihSusednihZnakova]]
    });
   }

  ngOnInit(): void {
  }

  password:string
  oldPassword:string
  newPassword: string
  confirmPassword : string
  message:string


  jednoVelikoSlovo(control) {
    return /[A-Z]/.test(control.value) ? null : { jednoVelikoSlovo: true };
  }

  barJedanBroj(control) {
    return /\d/.test(control.value) ? null : { barJedanBroj: true };
  }

  barJedanSpecijalniKarakter(control) {
    return /[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(control.value) ? null : { barJedanSpecijalniKarakter: true };
  }

  pocinjeSlovom(control) {
    return /^[a-zA-Z]/.test(control.value) ? null : { pocinjeSlovom: true };
  }

  bezDuplihSusednihZnakova(control) {
    const lozinka = control.value;
    for (let i = 0; i < lozinka.length - 1; i++) {
      if (lozinka[i] === lozinka[i + 1]) {
        return { bezDuplihSusednihZnakova: true };
      }
    }
    return null;
  }


  changePassword(){
    
    


    const username=sessionStorage.getItem('username');
    const password=document.getElementById('oldPassword')as HTMLInputElement | null;
    const passwordV=password?.value;
    const confirmPassword=document.getElementById('confirmPassword')as HTMLInputElement | null;
    const confirmPasswordV=confirmPassword?.value;
    const newPassword=document.getElementById('lozinka') as HTMLInputElement |null;
    const newPasswordV=newPassword?.value;

    if (this.lozinkaForma.get('lozinka').invalid) {
      this.message="Nova lozinka u lošem formatu";
      return;
    }
    if(newPasswordV==""){
      this.message="Nova lozinka ne sme biti prazna";
      return;
    }
    if(newPasswordV!=confirmPasswordV){
   
      this.message="Potvrda lozinke se ne podudara sa novom lozinkom!";
      return;
    }
    if(newPasswordV==passwordV){
      this.message="Stara i nova lozinka ne smeju biti iste!";
      return;
    }
    this.message="";
    if(sessionStorage.getItem('type')=='user'){
      this.userService.login(username,passwordV).subscribe((userFromDB:User)=>{
        if(userFromDB!=null){
          this.message="";
          this.userService.updatePassword(username,newPasswordV).subscribe((data:string)=>{
            if(data!=null){
              this.message="Uspešno ste promenili lozinku!"
              sessionStorage.clear();
              this.router.navigate(['/login']);
            }
          })
        }
        else{
          this.message="Stara lozinka nije tačna!";
        }
      })
    }else if(sessionStorage.getItem('type')=='lekar'){
      this.lekarService.login(username,passwordV).subscribe((lekarFromDB:Lekar)=>{
        alert(lekarFromDB);
        if(lekarFromDB!=null){
          this.message="";
          this.lekarService.updatePassword(username,newPasswordV).subscribe((data:string)=>{
            if(data!=null){
              this.message="Uspešno ste promenili lozinku!"
              sessionStorage.clear();
              this.router.navigate(['/login']);
            }
          })
        }
        else{
          alert(sessionStorage.getItem('username'));
          this.message="Stara lozinka nije tačna!";
        }
      })
    }
    else{
      this.message="Error";
    }

  }

  nazad(){
    this.router.navigate(['/home']);
  }

}
