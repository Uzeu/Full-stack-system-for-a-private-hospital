import { Component, OnInit } from '@angular/core';
import { SpecijalizacijaService } from '../specijalizacija.service';
import { PregledService } from '../pregled.service';
import { Specijalizacija } from '../model/specijalizacija';
import { Pregled } from '../model/pregled';
import { Lekar } from '../model/lekar';
import { LekarService } from '../lekar.service';

@Component({
  selector: 'app-razno-lekar',
  templateUrl: './razno-lekar.component.html',
  styleUrls: ['./razno-lekar.component.css']
})
export class RaznoLekarComponent implements OnInit {

  constructor(private specijalizacijaService: SpecijalizacijaService, private preglediService: PregledService, private lekarService: LekarService) { }

  specijalizacije: Specijalizacija[]
  lekar: Lekar
  ngOnInit(): void {

    this.specijalizacijaService.dohvatiSve().subscribe((data: Specijalizacija[]) => {
      if (data) {
        this.specijalizacije = data;
      }
    })

    this.lekarService.dohvatiJednog(sessionStorage.getItem('username')).subscribe((data: Lekar) => {
      if (data) {
        this.lekar = data;
      }
    })


  }
  errorBool: boolean = false;
  successBool: boolean = false;
  posaljiZahtev() {
    this.errorBool = false;
    this.successBool = false;
    const name = document.getElementById('name') as HTMLInputElement | null;
    const nameV = name?.value;
    const specialization = document.getElementById('specialization') as HTMLInputElement | null;
    const specializationV = specialization?.value;
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
    

    if (nameV == '' || specializationV == '' || priceV == '') {
      this.errorBool = true;
      return;
    }
    

    this.preglediService.dohvatiJednog(nameV).subscribe((data: Pregled) => {
      if (data) {
        this.errorBool = true;
        this.successBool = false;
        return;
      } else {
        

        this.preglediService.insertPregled(nameV, specializationV, priceV, durationV, 0).subscribe((data: string) => {
          if (data) {
            this.successBool = true;
            this.errorBool = false;
          } else {
            this.errorBool = true;
          }
        })
      }
    })


  }

}
