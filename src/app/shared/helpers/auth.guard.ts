import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { LoginService } from '../services/login/login.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private loginService: LoginService
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const authenticated = this.loginService.isAuthenticated;
        if(authenticated?.success)
            return true;

        this.router.navigate(['/login']);
        return false;
    }    
}
