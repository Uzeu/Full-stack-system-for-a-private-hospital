import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { LekarService } from '../lekar.service';
import { Lekar } from '../model/lekar';
import { User } from '../model/user';
import { SpecijalizacijaService } from '../specijalizacija.service';
import { Specijalizacija } from '../model/specijalizacija';
import { Pregled } from '../model/pregled';
import { PregledService } from '../pregled.service';

@Component({
  selector: 'app-menadzer-home',
  templateUrl: './menadzer-home.component.html',
  styleUrls: ['./menadzer-home.component.css']
})
export class MenadzerHomeComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private lekarService: LekarService, private specijalizacijaService: SpecijalizacijaService, private preglediService: PregledService) { }

  lekari: Lekar[] = []
  useri: User[] = []
  useriCekaju: User[] = []
  specijalizacije: Specijalizacija[]
  preglediCekaju: Pregled[] = []


  ngOnInit(): void {
    this.lekarService.dohvatiSve().subscribe((data: Lekar[]) => {
      this.lekari = data;
    });

    this.userService.dohvatiSve().subscribe((data: User[]) => {
      this.useri = data;
    });

    this.userService.dohvatiSveCekanje().subscribe((data: User[]) => {
      this.useriCekaju = data;
    });

    this.specijalizacijaService.dohvatiSve().subscribe((data: Specijalizacija[]) => {
      this.specijalizacije = data;

    })

    this.preglediService.dohvatiSve('', 0).subscribe((data: Pregled[]) => {
      this.preglediCekaju = data;
    })

  }

  redirectToInsert() {
    this.router.navigate(['/insertLekar']);
  }
  prebaciNaSpec() {
    let x = document.getElementById('specijalizacija');


    x.scrollIntoView()

  }

  odobri(username: string) {

    this.userService.updateType(username, 1).subscribe((data: string) => {
      if (data != null) {
        this.userService.dohvatiSveCekanje().subscribe((data: User[]) => {
          this.useriCekaju = data;
        });
        this.userService.dohvatiSve().subscribe((data: User[]) => {
          this.useri = data;
        });
        
      }
    })
  }

  odbij(username: string) {
    this.userService.updateType(username, 2).subscribe((data: string) => {
      if (data != null) {
        this.userService.dohvatiSveCekanje().subscribe((data: User[]) => {
          this.useriCekaju = data;
        });
        this.userService.dohvatiSve().subscribe((data: User[]) => {
          this.useri = data;
        });
        
      }
    })
  }

  izbrisiLekar(username: string) {
    this.lekarService.updateType(username, 2).subscribe((data: string) => {

      if (data != null) {
        this.lekarService.dohvatiSve().subscribe((data: Lekar[]) => {
          this.lekari = data;
        });
        
      }
    })

  }

  prebaciProfil(username: string) {
    sessionStorage.setItem('username', username);
    this.router.navigate(['/profil-user-view']);

  }

  prebaciProfilLekar(username: string) {

    sessionStorage.setItem('username', username);
    this.router.navigate(['/profil-lekar-view']);
  }


  errorMessage: string = ""
  alertTrigger: boolean = false
  insertSpecialization() {
    const specialization = document.getElementById('specialization') as HTMLInputElement | null;
    const specializationV = specialization?.value;
    if (specializationV == '') {
      return;
    }
    this.specijalizacijaService.dohvatiJednog(specializationV).subscribe((data: Specijalizacija) => {
      if (data != null) {
        this.errorMessage = 'Ta specijalizacija vec postoji!';
      }
      else {
        this.specijalizacijaService.insertSpecialization(specializationV).subscribe((data: string) => {
          if (data) {
            this.alertTrigger = true;
            this.errorMessage = "";
            this.specijalizacijaService.dohvatiSve().subscribe((data: Specijalizacija[]) => {
              this.specijalizacije = data;
            })

          }
          else {
            this.errorMessage = 'Greska u sistemu!';
            this.alertTrigger = false;
          }
        })
      }
    })



  }

  showFilters: boolean = false;
  showFilters2: boolean = true;
  showFilters3:boolean= true;
  
  preglediNazad(){
    
    this.showFilters=false;
    this.showFilters2=true;
    this.showFilters3=true;
    this.alertTrigger=false;
    this.errorBool=false;
  }
  preglediNapred(){
    this.showFilters=true;
    this.showFilters3=false;
    this.showFilters2=true;
    this.alertTrigger=false;
    this.errorBool=false;
  }
  azuriranjeNazad(){
    this.showFilters=true;
    this.showFilters2=true;
    this.showFilters3=false;
    this.alertTrigger=false;
    this.errorBool=false;

    this.preglediService.dohvatiSve(this.ime,1).subscribe((data:Pregled[])=>{
      if(data){
        this.preg=data;
      }
    })

    this.preglediService.dohvatiSve(this.ime,3).subscribe((data:Pregled[])=>{
      if(data){
        this.pregIzbr=data;
      }
    })

  }

  ime: string = ""
  preg: Pregled[]
  pregIzbr: Pregled[]

  pregledi(specialization: string) {
    this.preglediNapred();
    this.ime = specialization;
    this.preglediService.dohvatiSve(specialization, 1).subscribe((data: Pregled[]) => {
      this.preg = data;
    })
    this.preglediService.dohvatiSve(specialization, 3).subscribe((data: Pregled[]) => {
      this.pregIzbr = data;
    })

    let x = document.getElementById('name') as HTMLInputElement;
    x.value = "";
    x = document.getElementById('price') as HTMLInputElement;
    x.value = "";
    x = document.getElementById('duration') as HTMLInputElement;
    x.value = "";

  }
  errorMessage2: string = ""
  errorBool: boolean = false
  dodajPregled() {
    const name = document.getElementById('name') as HTMLInputElement | null;
    const nameV = name?.value;
    const price = document.getElementById('price') as HTMLInputElement | null;
    const priceV = price?.value;
    const duration = document.getElementById('duration') as HTMLInputElement | null;
    let durationV = duration?.value;

    const numberRegex: RegExp = /^[1-9][0-9]*$/;


    if(durationV==''){
      durationV='30';
    }

    if(!numberRegex.test(priceV) || !numberRegex.test(durationV)){
      this.errorBool=true;
      return;
    }

    if (priceV == '' || nameV == '') {
      this.errorBool = true;
      return;
    }
    this.errorBool = false;


    this.preglediService.dohvatiJednog(nameV).subscribe((data: Pregled) => {
      if (!data) {
        this.preglediService.insertPregled(nameV, this.ime, priceV, durationV, 1).subscribe((data: string) => {
          if (data) {
            this.alertTrigger = true;
            this.errorMessage2 = "";
            this.errorBool = false;
            this.preglediService.dohvatiSve(this.ime, 1).subscribe((data: Pregled[]) => {
              this.preg = data;
            })
          }
        })
      }
      else {
        this.errorMessage2 = "pregled sa tim imenom vec postoji!"
      }
    })
  }


  odobriPaket(name: string) {

    this.preglediService.updateType(name, 1).subscribe((data: string) => {
      if (data) {
        this.preglediService.dohvatiSve('', 0).subscribe((data: Pregled[]) => {
          this.preglediCekaju = data;
        })
      }
    })
  }

  odbijPaket(name: string) {
    this.preglediService.updateType(name, 3).subscribe((data: string) => {
      if (data) {
        this.preglediService.dohvatiSve('', 0).subscribe((data: Pregled[]) => {
          this.preglediCekaju = data;
        })

      }
    })
  }

  izbrisiPaket(name: string, specialization: string) {
    this.preglediService.updateType(name, 3).subscribe((data: string) => {
      if (data) {
        this.preglediService.dohvatiSve(specialization, 1).subscribe((data: Pregled[]) => {
          this.preg = data;
        })
        this.preglediService.dohvatiSve(specialization, 3).subscribe((data: Pregled[]) => {
          this.pregIzbr = data;
        })
      }
    })
  }

  vratiPaket(name: string, specialization: string) {
    this.preglediService.updateType(name, 1).subscribe((data: string) => {
      if (data) {
        this.preglediService.dohvatiSve(specialization, 1).subscribe((data: Pregled[]) => {
          this.preg = data;
        })
        this.preglediService.dohvatiSve(specialization, 3).subscribe((data: Pregled[]) => {
          this.pregIzbr = data;
        })


      }
    })
  }


  azuriramIme:string
  azuriramPrice:number
  azuriramDuration:number
  azuriramSpecialization:string
  azurirajPregled(name:string) {
    this.showFilters=true;
    this.showFilters3=true;
    this.showFilters2=false;
    this.alertTrigger=false;
    this.errorBool=false;
    this.preglediService.dohvatiJednog(name).subscribe((data:Pregled)=>{
      if(data){
        this.azuriramIme=data.name;
        this.azuriramPrice=data.price;
        this.azuriramDuration=data.duration;
        this.azuriramSpecialization=data.specialization;
      }
    })
    


  }

  azurirajPregledFinal(){

    this.alertTrigger=false;
    this.errorBool=false;

    const price=document.getElementById('azuriramPrice') as HTMLInputElement | null;
    const priceV=price?.value;
    

    const duration=document.getElementById('azuriramDuration') as HTMLInputElement | null;
    let durationV=duration?.value;

    const numberRegex: RegExp = /^[1-9][0-9]*$/;


    if(durationV==''){
      durationV='30';
    }

    if(!numberRegex.test(priceV) || !numberRegex.test(durationV)){
      this.errorBool=true;
      return;
    }

    this.preglediService.updatePriceDuration(this.azuriramIme,priceV,durationV).subscribe((data:string)=>{
      if(data){
        this.alertTrigger=true;
        this.errorBool=false;
      }
      else{
        this.errorBool=true;
        this.alertTrigger=false;
      }
    })


  }

}
