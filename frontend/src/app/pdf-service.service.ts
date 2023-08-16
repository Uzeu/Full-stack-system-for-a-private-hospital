import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { Zakazan } from './model/zakazan';

@Injectable({
  providedIn: 'root'
})
export class PdfServiceService {


   zamenaSlova(str: string): string {
    const zamenaMapa: Record<string, string> = {
      'š': 's',
      'đ': 'dj',
      'ž': 'z',
      'č': 'c',
      'ć': 'c'
    };
  
    return str
      .split('')
      .map(char => zamenaMapa[char] || char)
      .join('');
  }


  generatePdf(zakazan: Zakazan) {
    const doc = new jsPDF();
    

    doc.setFont('Roboto');
    doc.setFontSize(12);

    const maxWidth = doc.internal.pageSize.getWidth() - 20;
    const lineHeight = 7;

    let zadnjaPoz = 0;
    let pom;
    
    doc.text(`${zakazan.day}.${zakazan.month}.${zakazan.year}.  ${zakazan.hour}:${zakazan.minute} `, 10, 10);

    zakazan.firstnameLekar=this.zamenaSlova(zakazan.firstnameLekar);
    zakazan.lastnameLekar=this.zamenaSlova(zakazan.lastnameLekar);
    doc.text(`Lekar: ${zakazan.firstnameLekar} ${zakazan.lastnameLekar}`, 10, 30);

    doc.text(`Specijalizacija: ${zakazan.specialization}`, 10, 40);

    zakazan.reason=this.zamenaSlova(zakazan.reason);
    doc.text(`Razlog dolaska:`, 10, 60);
    pom = doc.splitTextToSize(zakazan.reason, maxWidth);
    for (let i = 0; i < pom.length; i++) {
      doc.text(pom[i], 10, 70 + i * lineHeight);
    }
    zadnjaPoz = 70 + (pom.length - 1) * lineHeight;

    zakazan.diagnosis=this.zamenaSlova(zakazan.diagnosis);
    doc.text(`Dijagnoza:`, 10, zadnjaPoz + 20);
    pom = doc.splitTextToSize(zakazan.diagnosis, maxWidth);

    for (let i = 0; i < pom.length; i++) {
      doc.text(pom[i], 10, zadnjaPoz + 30 + i * lineHeight);
    }
    zadnjaPoz = zadnjaPoz + 30 + (pom.length - 1) * lineHeight;
    doc.text(`Terapija:`, 10, zadnjaPoz + 20);

    zakazan.therapy=this.zamenaSlova(zakazan.therapy);
    pom = doc.splitTextToSize(zakazan.therapy, maxWidth);
    for (let i = 0; i < pom.length; i++) {
      doc.text(pom[i], 10, zadnjaPoz + 30 + i * lineHeight);
    }
    zadnjaPoz = zadnjaPoz + 30 + (pom.length - 1) * lineHeight;
    doc.text(`Preporuceni datum sledeceg pregleda:`, 10, zadnjaPoz + 20);


 

    const pdfBlob = doc.output('blob');
    return pdfBlob;
  }

  generatePdfStranice(zakazan: Zakazan[]) {
    const doc = new jsPDF();
    doc.setFont('Roboto'); 
    doc.setFontSize(12);

    const maxWidth = doc.internal.pageSize.getWidth() - 20;
    const lineHeight = 7;

    for(let i=0;i<zakazan.length;i++){
      zakazan[i].lastnameLekar=this.zamenaSlova(zakazan[i].lastnameLekar);
      zakazan[i].firstnameLekar=this.zamenaSlova(zakazan[i].firstnameLekar);
      zakazan[i].diagnosis=this.zamenaSlova(zakazan[i].diagnosis);
      zakazan[i].therapy=this.zamenaSlova(zakazan[i].therapy);
      zakazan[i].reason=this.zamenaSlova(zakazan[i].reason);
    }

    for (let i = 0; i < zakazan.length; i++) {
      let zadnjaPoz = 0;
      let pom;
      doc.text(`${zakazan[i].day}.${zakazan[i].month}.${zakazan[i].year}.  ${zakazan[i].hour}:${zakazan[i].minute} `, 10, 10);

      doc.text(`Lekar: ${zakazan[i].firstnameLekar} ${zakazan[i].lastnameLekar}`, 10, 30);

      doc.text(`Specijalizacija: ${zakazan[i].specialization}`, 10, 40);

      doc.text(`Razlog dolaska:`, 10, 60);
      pom = doc.splitTextToSize(zakazan[i].reason, maxWidth);
      for (let j = 0; j < pom.length; j++) {
        doc.text(pom[j], 10, 70 + j * lineHeight);
      }
      zadnjaPoz = 70 + (pom.length - 1) * lineHeight;

      doc.text(`Dijagnoza:`, 10, zadnjaPoz + 20);
      pom = doc.splitTextToSize(zakazan[i].diagnosis, maxWidth);

      for (let i = 0; i < pom.length; i++) {
        doc.text(pom[i], 10, zadnjaPoz + 30 + i * lineHeight);
      }
      zadnjaPoz = zadnjaPoz + 30 + (pom.length - 1) * lineHeight;
      doc.text(`Terapija:`, 10, zadnjaPoz + 20);
      pom = doc.splitTextToSize(zakazan[i].therapy, maxWidth);
      for (let i = 0; i < pom.length; i++) {
        doc.text(pom[i], 10, zadnjaPoz + 30 + i * lineHeight);
      }
      zadnjaPoz = zadnjaPoz + 30 + (pom.length - 1) * lineHeight;
      doc.text(`Preporuceni datum sledeceg pregleda: ${zakazan[i].dateAgain}`, 10, zadnjaPoz + 20);
      if(i!=zakazan.length-1)
        doc.addPage();
    }

    const pdfBlob = doc.output('blob');
    return pdfBlob;
  }
}


