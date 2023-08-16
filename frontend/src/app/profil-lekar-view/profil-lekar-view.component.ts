import { Component, OnInit } from '@angular/core';
import { LekarService } from '../lekar.service';
import { UserService } from '../user.service';
import { User } from '../model/user';
import { Lekar } from '../model/lekar';
import { SpecijalizacijaService } from '../specijalizacija.service';
import { Specijalizacija } from '../model/specijalizacija';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-lekar-view',
  templateUrl: './profil-lekar-view.component.html',
  styleUrls: ['./profil-lekar-view.component.css']
})
export class ProfilLekarViewComponent implements OnInit {

  constructor(private lekarService:LekarService,private userService:UserService,private specijalizacijaService:SpecijalizacijaService,private router:Router) { }

  username:string
  user:Lekar;
  errorMessage:string
  errorMessage2:string
  
  slikaUStringu:string
  tip:string
  specijalizacije:Specijalizacija[]=[]
  ngOnInit(): void {
    this.tip=sessionStorage.getItem('type');
    this.username=sessionStorage.getItem('username');
    this.lekarService.dohvatiJednog(this.username).subscribe((data:Lekar)=>{
      if(data!=null){
        this.user=data;
      }
      else{

      }
    })
    this.specijalizacijaService.dohvatiSve().subscribe((data:Specijalizacija[])=>{
      this.specijalizacije=data;
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
    const specialization=document.getElementById('specialization') as HTMLInputElement | null;
    const specializationV=specialization?.value;
    const licence=document.getElementById('licence') as HTMLInputElement | null;
    const licenceV=licence?.value;
    const office=document.getElementById('office') as HTMLInputElement | null;
    const officeV=office?.value;

    const regex = /^[1-9][0-9]*$/;
    const isNumber=regex.test(licenceV);
    if(!isNumber)
    {
      this.errorMessage2 = "Licenca mora biti broj !";
      return;
    }

    if ( firstnameV == "" || lastnameV == "" || phoneV == "" || adressV == "" || licenceV=="" || specializationV=="" || officeV==""|| emailV=="" || specializationV=='default') {
      this.errorMessage2 = "Sve mora biti uneto!";
      return;
    }

    

    const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(emailV)){
      this.errorMessage2="Email je u pogrešnom obliku. Mora biti example@example.example!"
      return;
  }


    this.lekarService.dohvatiJednogEmail(emailV).subscribe((data3: Lekar) => {
      if (data3 != null && data3.username!=sessionStorage.getItem('username')) {
        this.errorMessage2 = "Email je već u upotrebi!";
        return;
      } else {
        this.userService.dohvatiJednogEmail(emailV).subscribe((data4: User) => {
          if (data4 != null && data4.username!=sessionStorage.getItem('username')) {
            this.errorMessage2 = "Email je već u upotrebi!";
            return;
          }
          else {
            this.lekarService.updateAll(sessionStorage.getItem('username'), firstnameV, lastnameV, phoneV, emailV, adressV, this.slikaUStringu,licenceV,specializationV,officeV).subscribe(respObj => {

              if (respObj['message'] == 'updated') {
                this.ngOnInit();
                this.showallert=true;
                this.toggleFilters();
              }
              else {
              }
            });
          }
        })
      }
    })

    
  }

  editPregledi(){
    this.router.navigate(['/pregledi-edit-lekar']);
  }

}
