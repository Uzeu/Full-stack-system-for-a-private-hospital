import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZakazaniService {

  constructor(private http: HttpClient) { }

  insertZakazan(userForm,lekarForm,specializationForm,pregledForm,officeForm,typeForm,yearForm,monthForm,dayForm,hourForm,minuteForm,durationForm,firstnameForm,lastnameForm,firstnameLekarForm,lastnameLekarForm){
    const data={
      user:userForm,
      lekar:lekarForm,
      specialization:specializationForm,
      pregled:pregledForm,
      office:officeForm,
      type:typeForm,
      year:yearForm,
      month:monthForm,
      day:dayForm,
      hour:hourForm,
      minute:minuteForm,
      duration:durationForm,
      firstname:firstnameForm,
      lastname:lastnameForm,
      firstnameLekar:firstnameLekarForm,
      lastnameLekar:lastnameLekarForm
    }
    
    return this.http.post('http://localhost:4000/zakazani/insertZakazan',data)
  }

  dohvatiZakazan(lekarForm,userForm,typeForm){
    const data={
      lekar:lekarForm,
      user:userForm,
      type:typeForm
    }

    return this.http.post('http://localhost:4000/zakazani/dohvatiZakazan',data)
  }


  updateZakazani(userForm,lekarForm,yearForm,monthForm,dayForm,hourForm,minuteForm,reasonForm,diagnosisForm,therapyForm,dateAgainForm){
    const data={
      user:userForm,
      lekar:lekarForm,
      year:yearForm,
      month:monthForm,
      day:dayForm,
      hour:hourForm,
      minute:minuteForm,
      reason:reasonForm,
      diagnosis:diagnosisForm,
      therapy:therapyForm,
      dateAgain:dateAgainForm
    }
    
    return this.http.post('http://localhost:4000/zakazani/updateZakazani',data)
  }


  deleteZakazani(userForm,lekarForm,yearForm,monthForm,dayForm,hourForm,minuteForm){
    const data={
      user:userForm,
      lekar:lekarForm,
      year:yearForm,
      month:monthForm,
      day:dayForm,
      hour:hourForm,
      minute:minuteForm,
    }
    
    return this.http.post('http://localhost:4000/zakazani/deleteZakazani',data)
  }
}
