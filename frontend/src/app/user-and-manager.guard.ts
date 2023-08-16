import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAndManagerGuard implements CanActivate {
  constructor(private router:Router){ }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const tip = sessionStorage.getItem('type');

    if (tip === 'user' || tip==='menadzer') {
      return true;
    } else if(!tip){
      this.router.navigate(['/home']);
      return false;
    }
    else{
      this.router.navigate(['/profil-lekar-view']);
      return false;
    }
  }
  
  
}
