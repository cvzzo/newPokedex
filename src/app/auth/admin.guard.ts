import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate{

  userService = inject(UserService)

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot){
      return this.userService.getAdmin()
  }

}