import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenadzerService {

  constructor(private http: HttpClient) { }
  login(usernameFromForm, passwordFromForm){
    const data = {
      username: usernameFromForm,
      password: passwordFromForm
    }

    return this.http.post('http://localhost:4000/menadzer/login', data)
  }

  

  
}
