import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(usernameFromForm, passwordFromForm){
    const data = {
      username: usernameFromForm,
      password: passwordFromForm
    }

    return this.http.post('http://localhost:4000/users/login', data)
  }

  register(firstnameForm, lastnameForm, usernameForm, passwordForm, typeForm,adressForm,phoneForm,photoForm,emailForm){
    const data = {
      firstname: firstnameForm,
      lastname: lastnameForm,
      username: usernameForm,
      password: passwordForm,
      type: typeForm,
      adress:adressForm,
      phone:phoneForm,
      photo:photoForm,
      email:emailForm 
    }

    return this.http.post(`http://localhost:4000/users/register`, data)
  }

  dohvatiSve(){
    return this.http.get('http://localhost:4000/users/dohvatiSve')
  }
  dohvatiSveCekanje(){
    console.log("skrt");
    return this.http.get('http://localhost:4000/users/dohvatiSveCekanje')
  }

  dohvatiJednog(usernameForm){
    const data={
      username:usernameForm
    }
    return this.http.post('http://localhost:4000/users/dohvatiJednog',data)
  }

  dohvatiJednogEmail(emailForm){
    const data={
      email:emailForm
    }
    return this.http.post('http://localhost:4000/users/dohvatiJednogEmail',data)
  }



  updateType(usernameForm,typeForm){
    const data={
      username:usernameForm,
      type:typeForm
    }
    return this.http.post('http://localhost:4000/users/updateType',data)
  }

  addPregled(usernameForm,preglediForm){
    const data={
      username:usernameForm,
      pregledi:preglediForm
    }
    return this.http.post('http://localhost:4000/users/addPregled',data)
  }


  updatePassword(usernameForm,passwordForm){
    const data={
      username:usernameForm,
      password:passwordForm
    }
    return this.http.post('http://localhost:4000/users/updatePassword',data)
  }


  updateAll(usernameForm,firstnameForm,lastnameForm,phoneForm,emailForm,adressForm,photoForm){
    const data={
      username:usernameForm,
      firstname:firstnameForm,
      lastname:lastnameForm,
      phone:phoneForm,
      email:emailForm,
      adress:adressForm,
      photo:photoForm
    }
    return this.http.post('http://localhost:4000/users/updateAll',data)
  }
 
}
