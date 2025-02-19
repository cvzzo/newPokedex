import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate{

  authService = inject(AuthService)

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot){
      return this.authService.isRoleAdmin()
  }

}