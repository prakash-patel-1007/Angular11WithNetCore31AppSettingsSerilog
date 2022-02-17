import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { HelperService } from "./helper.service";

@Injectable()
export class AuthRouteGuardService implements CanActivate {

    constructor(
        private helperService: HelperService,
        public router: Router,
        ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const accessToken = this.helperService.getAccessToken();

        if (!accessToken) {
            this.router.navigate(['login']);
            return false;
        }

        return true;
    }
}