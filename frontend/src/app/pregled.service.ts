import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PregledService {

  constructor(private http:HttpClient) { }


  
  dohvatiJednog(nameForm){
    const data={
      name:nameForm
    }
    return this.http.post('http://localhost:4000/pregledi/dohvatiJednog',data)
  }

  insertPregled(nameForm,specializationForm,priceForm,durationForm,typeForm){
    const data={
      name:nameForm,
      specialization:specializationForm,
      price:priceForm,
      duration:durationForm,
      type:typeForm
    }
    return this.http.post('http://localhost:4000/pregledi/insertPregled',data)
  }

  dohvatiSve(specializationForm,typeForm){
    const data={
      specialization:specializationForm,
      type:typeForm
    }
    return this.http.post('http://localhost:4000/pregledi/dohvatiSve',data)
  }

  updateType(nameForm,typeForm){
    const data={
      name:nameForm,
      type:typeForm
    }
   
    return this.http.post('http://localhost:4000/pregledi/updateType',data)
  }

  updatePriceDuration(nameForm,priceForm,durationForm){
    const data={
      name:nameForm,
      price:priceForm,
      duration:durationForm
    }

    return this.http.post('http://localhost:4000/pregledi/updatePriceDuration',data)
  }
  
}
