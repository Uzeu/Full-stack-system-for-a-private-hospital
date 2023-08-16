import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LekarAndManagerGuard implements CanActivate {
  constructor(private router:Router){ }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const tip = sessionStorage.getItem('type');

    if (tip === 'lekar' || tip==='menadzer') {
      return true;
    } else if(!tip){
      this.router.navigate(['/home']);
      return false;
    }
    else{
      this.router.navigate(['/home']);
      return false;
    }
  }
  
}
