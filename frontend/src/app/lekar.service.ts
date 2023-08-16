import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LekarService {

  constructor(private http: HttpClient) { }

  private username: string

  setUsername(username: string) {
    this.username = username;
  }

  getUsername() {
    return this.username;
  }

  login(usernameFromForm, passwordFromForm){
    const data = {
      username: usernameFromForm,
      password: passwordFromForm
    }

    return this.http.post('http://localhost:4000/lekari/login', data)
  }

  register(firstnameForm, lastnameForm, usernameForm, passwordForm, typeForm,adressForm,phoneForm,photoForm,licenceForm,specializationForm,officeForm,emailForm){
    const data = {
      firstname: firstnameForm,
      lastname: lastnameForm,
      username: usernameForm,
      password: passwordForm,
      type: typeForm,
      adress:adressForm,
      phone:phoneForm,
      photo:photoForm,
      licence: licenceForm,
      specialization:specializationForm,
      office:officeForm,
      email:emailForm 
    }

    return this.http.post(`http://localhost:4000/lekari/register`, data)
  }

  dohvatiSve(){
    return this.http.get('http://localhost:4000/lekari/dohvatiSve')
  }

  dohvatiJednog(usernameForm){
    const data={
      username:usernameForm
    }
    return this.http.post('http://localhost:4000/lekari/dohvatiJednog',data)
  }

  dohvatiJednogEmail(emailForm){
    const data={
      email:emailForm
    }
    return this.http.post('http://localhost:4000/lekari/dohvatiJednogEmail',data)
  }



  updatePassword(usernameForm,passwordForm){
    const data={
      username:usernameForm,
      password:passwordForm
    }
    return this.http.post('http://localhost:4000/lekari/updatePassword',data)
  }


  updateType(usernameForm,typeForm){
    const data={
      username:usernameForm,
      type:typeForm
    }
    return this.http.post('http://localhost:4000/lekari/updateType',data)
  }

  updateAll(usernameForm,firstnameForm,lastnameForm,phoneForm,emailForm,adressForm,photoForm,licenceForm,specializationForm,officeForm){
    const data={
      username:usernameForm,
      firstname:firstnameForm,
      lastname:lastnameForm,
      phone:phoneForm,
      email:emailForm,
      adress:adressForm,
      photo:photoForm,
      licence: licenceForm,
      specialization:specializationForm,
      office:officeForm,
    }
    return this.http.post('http://localhost:4000/lekari/updateAll',data)
  }

  insertPregledi(usernameForm,preglediForm){
    const data={
      username:usernameForm,
      pregledi:preglediForm
    }
    return this.http.post('http://localhost:4000/lekari/insertPregledi',data)
  }

}
