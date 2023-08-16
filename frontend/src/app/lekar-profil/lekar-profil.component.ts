import { Component, Input, OnInit } from '@angular/core';
import { LekarService } from '../lekar.service';
import { Lekar } from '../model/lekar';
import { PregledService } from '../pregled.service';
import { Pregled } from '../model/pregled';
import { ZakazaniService } from '../zakazani.service';
import { Zakazan } from '../model/zakazan';
import { UserService } from '../user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-lekar-profil',
  templateUrl: './lekar-profil.component.html',
  styleUrls: ['./lekar-profil.component.css']
})
export class LekarProfilComponent implements OnInit {

  constructor(private lekarService: LekarService, private preglediService: PregledService, private zakazanService: ZakazaniService,private userService:UserService) { }

  username: string;
  lekar: Lekar;
  pregledi: Pregled[]
  brojevi: number[] = [];
  minuti: number[] = [];
  selectedPregled: Pregled;
  ngOnInit(): void {
    this.minuti[0] = 0;
    this.minuti[1] = 15;
    this.minuti[2] = 30;
    this.minuti[3] = 45;

    for (let i = 7; i < 22; i++) {
      this.brojevi[i - 7] = i;
    }


    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = (currentDate.getDate() + 1).toString().padStart(2, '0');
    const minDate = `${year}-${month}-${day}`;
    document.getElementById('datum')?.setAttribute('min', minDate);
    const year2 = year + 1;
    const maxDate = `${year2}-${month}-${day}`;
    document.getElementById('datum')?.setAttribute('max', maxDate);


    this.username = sessionStorage.getItem('lekar');
    this.lekarService.dohvatiJednog(this.username).subscribe((data: Lekar) => {
      if (data != null) {
        this.lekar = data;
        this.preglediService.dohvatiSve(this.lekar.specialization, 1).subscribe((data: Pregled[]) => {
          if (data) {
            this.pregledi = data;
            const presek: { name: string, specialization: string, price: number, duration: number, type: number }[] = this.pregledi.filter(item1 =>
              this.lekar.pregledi.some(item2 => item2.name === item1.name));
            this.lekar.pregledi = presek;
          }
        })

      }
      else {

      }

    })
  }

  showFilters1: boolean = false;
  showFilters2: boolean = true;
  prebaciZakazi() {
    this.showFilters1 = true;
    this.showFilters2 = false;


  }
  prebaciProfil() {
    this.showFilters1 = false;
    this.showFilters2 = true;

  }



  errorMessage:string=''
  errorAlert:boolean=false;
  successAlert:boolean=false;
  zakaziPregled() {
    this.errorAlert=false;
    this.successAlert=false;
    if (!this.selectedPregled) {
      this.errorMessage="Izaberite pregled!"
      this.errorAlert=true;
      return;
    }
    
    const datum = document.getElementById('datum') as HTMLInputElement | null;
    const datumV = datum?.value;

    const date = new Date(datumV);

    const godina = date.getFullYear();
    const mesec = date.getMonth() + 1;
    const dan = date.getDate();
    if (datumV == '') {
      this.errorMessage="Izaberite datum!";
      this.errorAlert=true;
      return;
    }
    
    let trajanje: number = this.selectedPregled.duration;

    const sat = document.getElementById('sat') as HTMLInputElement | null;
    const satt = sat?.value;
    const satV=parseInt(satt);

    const minut = document.getElementById('minut') as HTMLInputElement | null;
    const minutt = minut?.value;
    const minutV=parseInt(minutt);

    let preglediUser: Zakazan[]
    this.zakazanService.dohvatiZakazan(sessionStorage.getItem('lekar'),'', 0).subscribe((data: Zakazan[]) => {
      if (data) {
        preglediUser=data;
        for (let i = 0; i < preglediUser.length; i++) {
          if (preglediUser[i].year == godina) {
            if (preglediUser[i].month == mesec) {
              if (preglediUser[i].day == dan) {
                let trajanje2 = preglediUser[i].duration;
                if(satV+Math.floor((minutV+trajanje)/60) > preglediUser[i].hour && satV < preglediUser[i].hour ){
                  this.errorMessage="Taj termin nije slobodan!";
                  this.errorAlert=true;
                  return;
                }
                else if(satV+Math.floor((minutV+trajanje)/60) == preglediUser[i].hour && satV < preglediUser[i].hour){
                  if((minutV+trajanje)%60 > preglediUser[i].minute){
                    this.errorMessage="Taj termin nije slobodan!";
                    this.errorAlert=true;
                    return;
                  }
                }else if(satV==preglediUser[i].hour){
                  if(minutV+trajanje>preglediUser[i].minute && minutV<=preglediUser[i].minute){
                    this.errorMessage="Taj termin nije slobodan!";
                    this.errorAlert=true;
                    return;
                  }
                  if(preglediUser[i].minute+preglediUser[i].duration>minutV && preglediUser[i].minute <=minutV ){
                    this.errorMessage="Taj termin nije slobodan!";
                    this.errorAlert=true;
                    return;
                  }
                }else if(preglediUser[i].hour+Math.floor((preglediUser[i].minute+preglediUser[i].duration)/60)>satV && preglediUser[i].hour<satV){
                  this.errorMessage="Taj termin nije slobodan!";
                  this.errorAlert=true;
                  return;
                }else if(preglediUser[i].hour+Math.floor((preglediUser[i].minute+preglediUser[i].duration)/60)==satV && preglediUser[i].hour<satV ){
                  if((preglediUser[i].minute+preglediUser[i].duration)%60>minutV){
                    this.errorMessage="Taj termin nije slobodan!";
                    this.errorAlert=true;
                    return;
                  }
                }
              }
            }
          }
        }
        this.userService.dohvatiJednog(sessionStorage.getItem('username')).subscribe((data:User)=>{
          if(data){
            this.zakazanService.insertZakazan(sessionStorage.getItem('username'), this.username, this.lekar.specialization, this.selectedPregled.name, this.lekar.office, 0, godina, mesec, dan, satV, minutV, trajanje,data.firstname,data.lastname,this.lekar.firstname,this.lekar.lastname).subscribe((data: string) => {
              if (data) {
                this.successAlert=true;
              }
            })
          }
        })
        
      }
      else {
        alert("greska");
      }
    })



  }

}
