import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private router:Router){ }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const tip = sessionStorage.getItem('type');

    if (!tip) {
      return true;
    } else {
      if(tip==='user'){
        this.router.navigate(['/user']);
      }
      else if(tip==='lekar'){
        this.router.navigate(['/profil-lekar-view']);
      }
      else{
        this.router.navigate(['/menadzer-home']);
      }
      return false;
    }
  }
  
}
