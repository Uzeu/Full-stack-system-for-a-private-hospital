import { Component, OnInit } from '@angular/core';
import { Zakazan } from '../model/zakazan';
import { UserService } from '../user.service';
import { ZakazaniService } from '../zakazani.service';
import { PDFDocument, rgb } from 'pdf-lib';
import { PdfServiceService } from '../pdf-service.service';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-pregledi-user',
  templateUrl: './pregledi-user.component.html',
  styleUrls: ['./pregledi-user.component.css']
})
export class PreglediUserComponent implements OnInit {

  constructor(private userService:UserService,private zakzaniService:ZakazaniService,private pdfService: PdfServiceService ) { }

  userPregledi:Zakazan[]
  userIzvestaji:Zakazan[]

  ngOnInit(): void {
    this.zakzaniService.dohvatiZakazan('',sessionStorage.getItem('username'),-1).subscribe((data:Zakazan[])=>{
      if(data){
        const currentDate= new Date();
        this.userPregledi=data.filter(item=>item.type===0);
        this.userIzvestaji=data.filter(item=>item.type===1).sort((b, a) => {
          if (a.year !== b.year) return a.year - b.year;
          if (a.month !== b.month) return a.month - b.month;
          if (a.day !== b.day) return a.day - b.day;
          if (a.hour !== b.hour) return a.hour - b.hour;
          if (a.minute !== b.minute) return a.minute - b.minute;
          return 0;
        })
        this.userPregledi=this.userPregledi.filter(item=>{
          const datum = new Date(item.year, item.month - 1, item.day, item.hour, item.minute);
          return datum>currentDate;
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

  

  exportPdf(zakazan:Zakazan){
    
    
    const pdfBlob = this.pdfService.generatePdf(zakazan);
    const imeString=zakazan.firstname+'-'+zakazan.lastname+'-Izvestaj';
    FileSaver.saveAs(pdfBlob, imeString);
  }

  exportPdfStranice(zakazan:Zakazan[]){
    const pdfBlob = this.pdfService.generatePdfStranice(zakazan);
    const imeString=zakazan[0].firstname+'-'+zakazan[0].lastname+'-SviIzvestaji';
    FileSaver.saveAs(pdfBlob, imeString);
  }

  otkazi(zakazan:Zakazan){
    this.zakzaniService.deleteZakazani(zakazan.user,zakazan.lekar,zakazan.year,zakazan.month,zakazan.day,zakazan.hour,zakazan.minute).subscribe((data:string)=>{
      if(data){
        for(let i=0;i<this.userPregledi.length;i++){
          if(zakazan.user==this.userPregledi[i].user && zakazan.lekar==this.userPregledi[i].lekar && zakazan.year==this.userPregledi[i].year && zakazan.month==this.userPregledi[i].month && zakazan.day==this.userPregledi[i].day && zakazan.hour==this.userPregledi[i].hour && zakazan.minute==this.userPregledi[i].minute){
            this.userPregledi.splice(i,1);
            break;
          }
        }
      }
    })
  }

}
