import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAndGuestGuard implements CanActivate {
  constructor(private router:Router){ }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const tip = sessionStorage.getItem('type');

    if (tip === 'user' || !tip) {
      return true;
    } else if(tip==='lekar'){
      this.router.navigate(['/profil-lekar-view']);
      return false;
    }
    else{
      this.router.navigate(['/menadzer-home']);
      return false;
    }
  }
  
}
