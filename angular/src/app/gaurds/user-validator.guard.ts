import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserValidatorGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.userService.user.valid) {
      return this.userService.user.valid;
    }
    else { 
      alert("Login to search flights !!");
      //this.router.navigate(["login"]);
     }
    return false;

  }

}
