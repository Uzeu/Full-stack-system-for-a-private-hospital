import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LekarGuard implements CanActivate {
  constructor(private router:Router){ }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const tip = sessionStorage.getItem('type');

    if (tip === 'lekar') {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
  
}
