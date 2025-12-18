import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { TokenService } from "@services";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PublicGuard {
  constructor(private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!TokenService.getToken) {
      return true;
    } else {
        //AÑADIR HOME COMPONENT CUANDO SE CREE
        //this.router.navigate([HomeComponent.PATH]);
      return false;
    }
  }
}
