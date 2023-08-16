import { Component, OnInit } from '@angular/core';
import { ZakazaniService } from '../zakazani.service';
import { Zakazan } from '../model/zakazan';
import { User } from '../model/user';

@Component({
  selector: 'app-pregledi-lekar',
  templateUrl: './pregledi-lekar.component.html',
  styleUrls: ['./pregledi-lekar.component.css']
})
export class PreglediLekarComponent implements OnInit {

  constructor(private zakazaniService: ZakazaniService, private userService: ZakazaniService) { }


  zakazani: Zakazan[]
  pacijentIzvestaji:Zakazan[]
  pacijentPregledi:Zakazan[]
  user: User
  lekar:string;
  ngOnInit(): void {
    this.lekar=sessionStorage.getItem('username');
    this.zakazaniService.dohvatiZakazan(sessionStorage.getItem('username'), '', 0).subscribe((data: Zakazan[]) => {
      if (data) {
        const currentDate = new Date();
        this.zakazani=data.filter(item=>{
          const zakazanDatum= new Date(item.year,item.month-1,item.day,item.hour,item.minute);
          const zakazanoVreme=zakazanDatum.getTime();
          const zakazanoVremeTrajanje=zakazanoVreme+item.duration*60*1000;
          const trenutnoVreme=currentDate.getTime();
          return zakazanoVremeTrajanje>trenutnoVreme;
        })

        this.zakazani = this.zakazani.sort((a, b) => {
          if (a.year !== b.year) return a.year - b.year;
          if (a.month !== b.month) return a.month - b.month;
          if (a.day !== b.day) return a.day - b.day;
          if (a.hour !== b.hour) return a.hour - b.hour;
          if (a.minute !== b.minute) return a.minute - b.minute;
          return 0;
        }).slice(0,3);
      }
    })
  }

  showFilters1:boolean=false;
  showFilters2:boolean=true;
  showFilters3:boolean=true;
  promenljiva:string;
  prebaciKarton(username:string){
    this.showFilters1=true;
    this.showFilters2=false;
    const currentDate= new Date();
    this.promenljiva=username;
    this.zakazaniService.dohvatiZakazan('',username,-1).subscribe((data:Zakazan[])=>{
      if(data){
        this.pacijentIzvestaji=data.filter(item=>item.type===1);
        this.pacijentPregledi=data.filter(item=>item.type===0);
        this.pacijentPregledi=this.pacijentPregledi.filter(item=>{
          const datum = new Date(item.year, item.month - 1, item.day, item.hour, item.minute);
          const datumKraj = new Date(datum.getTime() + item.duration * 60000);

          if(datumKraj > currentDate && datum<currentDate)item.diagnosis="U toku";
          else item.diagnosis="Zavrsen";
          
          return datum < currentDate;
        }).sort((a, b) => {
          if (a.year !== b.year) return a.year - b.year;
          if (a.month !== b.month) return a.month - b.month;
          if (a.day !== b.day) return a.day - b.day;
          if (a.hour !== b.hour) return a.hour - b.hour;
          if (a.minute !== b.minute) return a.minute - b.minute;
          return 0;
        })

      }
    })
    
  }

  prebaciPregledi(){
    this.showFilters1=false;
    this.showFilters2=true;
  }
  izvestaj:Zakazan
  prebaciIzvestaj(zakazan:Zakazan){
    this.showFilters2=true;
    this.showFilters3=false;
    this.izvestaj=zakazan;
  }
  vratiPregledi(){
    this.showFilters2=false;
    this.showFilters3=true;
  }

  errorAlert:boolean=false;
  updateIzvestaj(){
    
    const razlog=document.getElementById('razlog') as HTMLInputElement | null;
    const razlogV=razlog?.value;
    const dijagnoza=document.getElementById('dijagnoza') as HTMLInputElement | null;
    const dijagnozaV=dijagnoza?.value;
    const terapija=document.getElementById('terapija') as HTMLInputElement | null;
    const terapijaV=terapija?.value;
    const preporuceni=document.getElementById('preporuceni') as HTMLInputElement | null;
    const preporuceniV=preporuceni?.value;
    

    if(razlogV=='' || dijagnozaV=='' || terapijaV=='' || preporuceniV==''){
      this.errorAlert=true;
      return;
    }

    

    this.zakazaniService.updateZakazani(this.izvestaj.user,this.izvestaj.lekar,this.izvestaj.year,this.izvestaj.month,this.izvestaj.day,this.izvestaj.hour,this.izvestaj.minute,razlogV,dijagnozaV,terapijaV,preporuceniV).subscribe((data:string)=>{
      if(data){
        const currentDate= new Date();
        this.zakazaniService.dohvatiZakazan('',this.promenljiva,-1).subscribe((data:Zakazan[])=>{
          if(data){
            this.pacijentIzvestaji=data.filter(item=>item.type===1);
            this.pacijentPregledi=data.filter(item=>item.type===0);
            this.pacijentPregledi=this.pacijentPregledi.filter(item=>{
              const datum = new Date(item.year, item.month - 1, item.day, item.hour, item.minute);
              const datumKraj = new Date(datum.getTime() + item.duration * 60000);
    
              if(datumKraj > currentDate && datum<currentDate)item.diagnosis="U toku";
              else item.diagnosis="Zavrsen";
              
              return datum < currentDate;
            }).sort((a, b) => {
              if (a.year !== b.year) return a.year - b.year;
              if (a.month !== b.month) return a.month - b.month;
              if (a.day !== b.day) return a.day - b.day;
              if (a.hour !== b.hour) return a.hour - b.hour;
              if (a.minute !== b.minute) return a.minute - b.minute;
              return 0;
            })
    
          }
        })
        this.vratiPregledi();
      }
    })

   



  }

}
