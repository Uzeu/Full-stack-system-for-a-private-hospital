import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../user.service'
import { Router } from '@angular/router';


import { LekarService } from '../lekar.service';
import { Lekar } from '../model/lekar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  constructor(private userService: UserService, private router: Router, private lekarService: LekarService) {

  }



  ngOnInit(): void {
  }

  firstname: string;
  lastname: string;
  username: string;
  password: string;
  adress: string;
  phone: number;
  type: number;
  email: string;
  message: string;
  errorMessage: string;
  errorMessage2 = "";


  slikaUStringu: string | null;

  proveriSliku(event: any) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }
    const allowedExtensions = ['image/jpeg', 'image/png'];
    if (!allowedExtensions.includes(file.type)) {
      this.errorMessage = 'Izaberite samo JPG ili PNG sliku.';
      return;
    }

    const img = new Image();
    img.onload = () => {
      if (img.width >= 100 && img.height >= 100 && img.width <= 300 && img.height <= 300) {
        this.errorMessage = null;

      } else {
        this.errorMessage = 'Slika nije u dozvoljenim dimenzijama. Min: 100x100, Max: 300x300.';
      }
    };

    img.onerror = () => {
      this.errorMessage = 'Greška pri učitavanju slike.';
    };

    const reader = new FileReader();
    reader.onload = (e: any) => {
      img.src = e.target.result as string;
      this.slikaUStringu = img.src;

    };

    reader.readAsDataURL(file);


  }





  alertSuccess: boolean=false



  register() {


    if (this.slikaUStringu == null) {
      this.slikaUStringu = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAACXBIWXMAAA86AAAPOgGXOdvCAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIzLTA4LTAyVDAxOjA5OjAxKzAyOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMy0wOC0wNFQwOToxOToyNCswMjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMy0wOC0wNFQwOToxOToyNCswMjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDphNDE3NzQwNS1jYzFlLTYyNGUtYWRiZi1kZjE3ZDcwOWRmN2IiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDozMjkxMzJjOS01NjIzLWFiNGUtYjUwZi02MTA3MWU2NzUzYTUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4MDRjNjk4OC00Yjg4LWRiNDQtYmVhZi1lYmE4NWNiZGViNmUiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjgwNGM2OTg4LTRiODgtZGI0NC1iZWFmLWViYTg1Y2JkZWI2ZSIgc3RFdnQ6d2hlbj0iMjAyMy0wOC0wMlQwMTowOTowMSswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphNDE3NzQwNS1jYzFlLTYyNGUtYWRiZi1kZjE3ZDcwOWRmN2IiIHN0RXZ0OndoZW49IjIwMjMtMDgtMDRUMDk6MTk6MjQrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4/F3qvAAAmBklEQVR42u2deYxd5XnGpwkUHEhAIsrSNMFR1LokTQmpVKlViVmSUFAlI2hLUicqpCkSLaaYOG6Jkj8IiZK6lSsTETmAardOlTYtVVqDPbbHs91Z7r7PzJ25s9zZ9xkbDFEU8On3fOecO9f2LPece/bz/PFoPOM7d3mX33zL+71f0+rSXBNF1eh6od8SukvoQaGvCD0h9IzQc0LHhF4VigjFhDJCRaGyUEVoVmhZ06z2s7L2mIz2OxHtOY5pz/mM9hpf0V7zLu09XE9/ULWiEcKp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';

    }


    const password2 = document.getElementById('lozinka2') as HTMLInputElement | null;
    const password2V = password2?.value;
    const password1 = document.getElementById('lozinka') as HTMLInputElement | null;
    let password1V = password1?.value;
    const passwordRegex = /^(?!.*(.)\1)(?=.*[A-Za-z])(?=.*\d)(?=.*[A-Z])(?=.*[@!#$%^&*])[a-zA-Z\d@!#$%^&*]{7,13}/;
    



    if (!passwordRegex.test(password1V)) {
      this.errorMessage2 = 'Lozinka ne ispunjava zahteve : (8-14 karaktera, bar jedno veliko slovo,broj,spec. karakter, pocinje slovom, bez dva uzastopna znaka';
      return;
    }


    const user = document.getElementById('username') as HTMLInputElement | null;
    const userV = user?.value;
    const name = document.getElementById('firstname') as HTMLInputElement | null;
    const nameV = name?.value;
    const lname = document.getElementById('lastname') as HTMLInputElement | null;
    const lnameV = lname?.value;
    const phone = document.getElementById('phonenumber') as HTMLInputElement | null;
    const phoneV = phone?.value;
    let phoneV2 = Number.parseInt(phoneV);
    const adress = document.getElementById('adress') as HTMLInputElement | null;
    const adressV = adress?.value;
    const photo = document.getElementById('inputGroupFile01') as HTMLInputElement | null;
    const photoV = photo?.value;

    const email = document.getElementById('email') as HTMLInputElement | null;
    const emailV = email?.value;

    const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const regex = /^[0-9]*$/;
    const isNumber = regex.test(phoneV);
    if (!isNumber) {
      this.errorMessage2 = "Broj telefona ne sme sadrzati slova ni znakove !";
      return;
    }


    if (password2V != password1V) {
      this.errorMessage2 = "Lozinke se moraju poklapati"
      return;
    }

    if (userV == "" || nameV == "" || lnameV == "" || phoneV == "" || adressV == "" || emailV == "") {
      this.errorMessage2 = "Sve mora biti uneto";
      return;
    }
    if (!emailPattern.test(emailV)) {
      this.errorMessage2 = "Email je u pogrešnom obliku mora biti example@example.example"
      return;
    }
    if (isNaN(phoneV2)) {
      this.errorMessage2 = "Broj telefona ne sme sadržati slova ni znakove";
      return;
    }
    if (this.errorMessage != null) {
      return;
    }
    else {
      this.errorMessage2 = "";

    }
    this.type = 0;


    this.lekarService.dohvatiJednog(userV).subscribe((data: Lekar) => {
      if (data != null) {
        this.errorMessage2 = "Već postoji korisnik sa tim korisničkim imenom!";
        return;
      } else {
        this.userService.dohvatiJednog(userV).subscribe((data2: User) => {
          if (data2 != null) {
            this.errorMessage2 = "Već postoji korisnik sa tim korisničkim imenom!";
            return;
          }
          else {
            this.lekarService.dohvatiJednogEmail(emailV).subscribe((data3: Lekar) => {
              if (data3 != null) {
                this.errorMessage2 = "Email je već u upotrebi!";
                return;
              } else {
                this.userService.dohvatiJednogEmail(emailV).subscribe((data4: User) => {
                  if (data4 != null) {
                    this.errorMessage2 = "Email je već u upotrebi!";
                    return;
                  }
                  else {
                    this.userService.register(nameV, lnameV, userV, password1V, this.type, adressV, phoneV2, this.slikaUStringu, emailV).subscribe(respObj => {

                      if (respObj['message'] == 'ok') {
                        this.alertSuccess=true;
                        setTimeout(() => {
                          this.router.navigate(['/home']);
                        }, 1500);
                      }
                      else {
                        this.message = 'Error'
                      }
                    });
                  }
                })
              }
            })


          }
        })
      }
    })







  }

}
