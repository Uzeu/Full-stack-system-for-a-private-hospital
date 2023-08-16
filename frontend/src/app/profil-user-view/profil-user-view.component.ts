import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/user';
import { LekarService } from '../lekar.service';
import { Lekar } from '../model/lekar';

@Component({
  selector: 'app-profil-user-view',
  templateUrl: './profil-user-view.component.html',
  styleUrls: ['./profil-user-view.component.css']
})
export class ProfilUserViewComponent implements OnInit {

  constructor(private userService:UserService,private lekarService:LekarService) { }

  username:string
  user:User
  errorMessage:string
  errorMessage2:string
  
  slikaUStringu:string

  ngOnInit(): void {
    this.username=sessionStorage.getItem('username');
    this.userService.dohvatiJednog(this.username).subscribe((data:User)=>{
      if(data!=null){
        this.user=data;
      }
      else{

      }
    })

  }

  showFilters: boolean = false;
  toggleFilters() {
    this.showFilters = !this.showFilters;
    this.showallert=false;
  }


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
        const profilna=document.getElementById('profilna-slika') as HTMLImageElement;
        profilna.src=img.src;

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
      this.slikaUStringu = img.src;

    };

    reader.readAsDataURL(file);

  }

  showallert:boolean=false;

  sacuvajPromene(){

    const firstname=document.getElementById('firstname') as HTMLInputElement |null;
    const firstnameV=firstname?.value;
    const lastname=document.getElementById('lastname') as HTMLInputElement | null;
    const lastnameV=lastname?.value;
    const phone=document.getElementById('phone') as HTMLInputElement | null;
    const phoneV=phone?.value;
    const email=document.getElementById('email') as HTMLInputElement | null;
    const emailV=email?.value;
    const adress=document.getElementById('adress') as HTMLInputElement | null;
    const adressV=adress?.value;
    
    if ( firstnameV == "" || lastnameV == "" || phoneV == "" || adressV == "" || emailV=="" ) {
      this.errorMessage2 = "Sve mora biti uneto";
      return;
    }

    const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(emailV)){
      this.errorMessage2="Email je u pogresnom obliku mora biti example@example.example"
      return;
  }


    this.lekarService.dohvatiJednogEmail(emailV).subscribe((data3: Lekar) => {
      if (data3 != null && data3.username!=sessionStorage.getItem('username')) {
        this.errorMessage2 = "Email je vec u upotrebi!";
        return;
      } else {
        this.userService.dohvatiJednogEmail(emailV).subscribe((data4: User) => {
          if (data4 != null && data4.username!=sessionStorage.getItem('username')) {
            this.errorMessage2 = "Email je vec u upotrebi!";
            return;
          }
          else {
            this.userService.updateAll(sessionStorage.getItem('username'), firstnameV, lastnameV, phoneV, emailV, adressV, this.slikaUStringu).subscribe(respObj => {

              if (respObj['message'] == 'updated') {
                this.ngOnInit();
                this.showallert=true;
              }
              else {
              }
            });
          }
        })
      }
    })

    
  }
}
