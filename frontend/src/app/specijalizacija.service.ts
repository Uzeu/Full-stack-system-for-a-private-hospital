import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecijalizacijaService {

  constructor(private http:HttpClient) { }


  
  dohvatiJednog(specializationForm){
    const data={
      specialization:specializationForm
    }
    return this.http.post('http://localhost:4000/specijalizacije/dohvatiJednog',data)
  }

  insertSpecialization(specializationForm){
    const data={
      specialization:specializationForm
    }
    return this.http.post('http://localhost:4000/specijalizacije/insertSpecialization',data)
  }

  dohvatiSve(){
    return this.http.get('http://localhost:4000/specijalizacije/dohvatiSve')
  }
  


}
