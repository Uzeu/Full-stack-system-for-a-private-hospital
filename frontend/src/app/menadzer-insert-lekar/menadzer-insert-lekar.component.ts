import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MenadzerService } from '../menadzer.service';
import { Router } from '@angular/router';
import { LekarService } from '../lekar.service';
import { Lekar } from '../model/lekar';
import { User } from '../model/user';
import { SpecijalizacijaService } from '../specijalizacija.service';
import { Specijalizacija } from '../model/specijalizacija';

@Component({
  selector: 'app-menadzer-insert-lekar',
  templateUrl: './menadzer-insert-lekar.component.html',
  styleUrls: ['./menadzer-insert-lekar.component.css']
})
export class MenadzerInsertLekarComponent implements OnInit {

  constructor( private lekariService: LekarService, private router: Router,private userService:UserService,private specijalizacijaService:SpecijalizacijaService) {
    
  }


  specijalizacije:Specijalizacija[]
  ngOnInit(): void {
    this.specijalizacijaService.dohvatiSve().subscribe((data:Specijalizacija[])=>{
      this.specijalizacije=data;
      
    })
  }

  ucitajOpet(){
    this.specijalizacijaService.dohvatiSve().subscribe((data:Specijalizacija[])=>{
      this.specijalizacije=data;
    })
  }

  firstname: string;
  lastname: string;
  username: string;
  password: string;
  adress: string;
  phone: number;
  type: number;

  licence: number;
  specialization : string;
  office : string;

  email:string

  message: string;
  errorMessage: string;
  errorMessage2 = "";


  slikaUStringu: string;

  proveriSliku(event: any) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }
    const allowedExtensions = ['image/jpeg', 'image/png'];
    if (!allowedExtensions.includes(file.type)) {
      this.errorMessage = 'Izaberite samo JPG ili PNG sliku.';
      return;
    }

    const img = new Image();
    img.onload = () => {
      if (img.width >= 100 && img.height >= 100 && img.width <= 300 && img.height <= 300) {
        this.errorMessage = null;

      } else {
        this.errorMessage = 'Slika nije u dozvoljenim dimenzijama. Min: 100x100, Max: 300x300.';
      }
    };

    img.onerror = () => {
      this.errorMessage = 'Greška pri učitavanju slike.';
    };

    const reader = new FileReader();
    reader.onload = (e: any) => {
      img.src = e.target.result as string;
      this.slikaUStringu=img.src;
    };

    reader.readAsDataURL(file);

   





  }



  async fileToBuffer(file: File): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        const buffer = Buffer.from(uint8Array);
        resolve(buffer);
      };

      reader.onerror = () => {
        reject(new Error('Greška pri konvertovanju File u Buffer.'));
      };

      reader.readAsArrayBuffer(file);
    });
  }



  register() {
    

    
    const password2=document.getElementById('lozinka2') as HTMLInputElement | null;
    const password2V=password2?.value;
    const password1=document.getElementById('lozinka') as HTMLInputElement | null;
    let password1V=password1?.value;
    const passwordRegex = /^(?!.*(.)\1)(?=.*[A-Za-z])(?=.*\d)(?=.*[A-Z])(?=.*[@!#$%^&*])[a-zA-Z\d@!#$%^&*]{7,13}/;
   
    



    if(!passwordRegex.test(password1V)){
      this.errorMessage2='Lozinka ne ispunjava zahteve : (8-14 karaktera, bar jedno veliko slovo,broj,spec. karakter, pocinje slovom, bez dva uzastopna znaka';
      return;
    }
    this.errorMessage2='';
    const user = document.getElementById('username') as HTMLInputElement | null;
    const userV = user?.value;
    const name = document.getElementById('firstname') as HTMLInputElement | null;
    const nameV = name?.value;
    const lname = document.getElementById('lastname') as HTMLInputElement | null;
    const lnameV = lname?.value;
    const phone = document.getElementById('phonenumber') as HTMLInputElement | null;
    const phoneV = phone?.value;
    let phoneV2 = Number.parseInt(phoneV);
    const adress = document.getElementById('adress') as HTMLInputElement | null;
    const adressV = adress?.value;
    const photo = document.getElementById('inputGroupFile01') as HTMLInputElement | null;
    const photoV = photo?.value;

    const licencee=document.getElementById('licence') as HTMLInputElement | null;
    const licenceV= licencee?.value;
    let licenceV2=Number.parseInt(licenceV);
    const specializationn=document.getElementById('specialization') as HTMLInputElement | null;
    const specializationV= specializationn?.value;
    const officee=document.getElementById('office') as HTMLInputElement | null;
    const officeV= officee?.value;

    const email=document.getElementById('email') as HTMLInputElement | null;
    const emailV=email?.value;

    const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
   
    
    if(password2V!=password1V){
      this.errorMessage2="lozinke se moraju poklapati"
      return;
    }

    if(!this.slikaUStringu){
      this.errorMessage2="morate uneti profilnu sliku!";
      return ;
    }

    if (userV == "" || nameV == "" || lnameV == "" || phoneV == "" || adressV == "" || licenceV=="" || specializationV=="" || officeV==""|| emailV=="" || password1V=="" || specializationV=='default' ) {
      this.errorMessage2 = "sve mora biti uneto";
      return;
    }
    if(!emailPattern.test(emailV)){
      this.errorMessage2="email je u pogresnom obliku mora biti example@example.example"
      return;
  }
    if (isNaN(phoneV2)) {
      this.errorMessage2 = "broj telefona ne sme sadrzati slova ni znakove";
      return;
    }
    if (isNaN(licenceV2)) {
      this.errorMessage2 = "licenca ne sme sadrzati slova ni znakove";
      return;
    }
    if (this.errorMessage != null) {
      return;
    }
    else {
      this.errorMessage2 = "";

    }
    this.type = 1;

  
    
    this.lekariService.dohvatiJednog(userV).subscribe((data: Lekar) => {
      if (data != null) {
        this.errorMessage2 = "Vec postoji korisnik sa tim korisnickim imenom!";
        return;
      } else {
        this.userService.dohvatiJednog(userV).subscribe((data2: User) => {
          if (data2 != null) {
            this.errorMessage2 = "Vec postoji korisnik sa tim korisnickim imenom!";
            return;
          }
          else {
            this.lekariService.dohvatiJednogEmail(emailV).subscribe((data3: Lekar) => {
              if (data3 != null) {
                this.errorMessage2 = "Email je vec u upotrebi!";
                return;
              } else {
                this.userService.dohvatiJednogEmail(emailV).subscribe((data4: User) => {
                  if (data4 != null) {
                    this.errorMessage2 = "Email je vec u upotrebi!";
                    return;
                  }
                  else {
                    this.lekariService.register(nameV, lnameV, userV, password1V, this.type, adressV, phoneV2, this.slikaUStringu,licenceV2,specializationV,officeV, emailV).subscribe(respObj => {

                      if (respObj['message'] == 'ok') {
                        this.message = 'User added'
                      }
                      else {
                        this.message = 'Error'
                      }
                    });
                  }
                })
              }
            })


          }
        })
      }
    }) 



  }
}
