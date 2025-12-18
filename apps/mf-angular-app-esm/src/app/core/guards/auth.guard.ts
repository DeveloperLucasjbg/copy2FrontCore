import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { TokenService } from "@services";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (TokenService.isLogged()) {
      return true;
    } else {
      // Redirigir al login si no está autenticado
      return this.router.createUrlTree(['/login']);
    }
  }
}

