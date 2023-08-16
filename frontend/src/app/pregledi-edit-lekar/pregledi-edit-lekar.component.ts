import { Component, OnInit } from '@angular/core';
import { LekarService } from '../lekar.service';
import { PregledService } from '../pregled.service';
import { User } from '../model/user';
import { Pregled } from '../model/pregled';
import { Lekar } from '../model/lekar';

@Component({
  selector: 'app-pregledi-edit-lekar',
  templateUrl: './pregledi-edit-lekar.component.html',
  styleUrls: ['./pregledi-edit-lekar.component.css']
})
export class PreglediEditLekarComponent implements OnInit {

  constructor(private lekarService: LekarService, private pregledService: PregledService) { }



  lekar: Lekar
  pregledi: Pregled[]
  ngOnInit(): void {

    this.lekarService.dohvatiJednog(sessionStorage.getItem('username')).subscribe((data: Lekar) => {
      this.lekar = data;
      
      this.pregledService.dohvatiSve(this.lekar.specialization,1).subscribe((data: Pregled[]) => {
        this.pregledi = data; 
            const presek: { name: string, specialization: string, price: number, duration: number, type: number }[] = this.pregledi.filter(item1 =>
              this.lekar.pregledi.some(item2 => item2.name === item1.name));
            this.lekar.pregledi = presek;
      })
    })
  }

  errorBool: boolean = false
  successBool: boolean = false
  dodajPregled() {
    this.errorBool = false;
    this.successBool = false;
    const pom = document.getElementById('pregledi') as HTMLInputElement | null;
    const pregled = pom?.value;
    let trazeni;

    for (let i = 0; i < this.lekar.pregledi.length; i++) {
      if (pregled == this.lekar.pregledi[i].name) {
        this.errorBool = true;
        return;
      }
    }

    for (let i = 0; i < this.pregledi.length; i++) {
      if (pregled == this.pregledi[i].name) {
        trazeni = this.pregledi[i];
        break;
      }
    }

    this.lekar.pregledi.push(trazeni);
    this.lekarService.insertPregledi(this.lekar.username, this.lekar.pregledi).subscribe((data: string) => {
      if (data) {
        this.successBool = true;
      }
    })



  }


  izbaciPregled(pregled) {
    for (let i = 0; i < this.lekar.pregledi.length; i++) {
      if (pregled == this.lekar.pregledi[i].name) {
        this.lekar.pregledi.splice(i,1);
        break;
      }
    }
    this.lekarService.insertPregledi(this.lekar.username, this.lekar.pregledi).subscribe((data: string) => {
      if (data) {
        
      }
    })

  }
}


