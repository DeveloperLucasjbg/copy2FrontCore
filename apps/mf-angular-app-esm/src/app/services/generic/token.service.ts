import { inject, Injectable } from '@angular/core';
import { UserTokenInterface } from '@interfaces/userToken.interface';
import {
  AppReloadService,
  IdleService,
  LoginService,
  UsersService,
} from '@services';
import { decodeJwt } from 'jose';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { I18nService } from './i18n.service';

export interface UserInterface {
  id: number;
  email: string;
  fullname: string;
  type: string;
  identityIdList: string[];
  documentType: string;
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private usersService = inject(UsersService);
  public static TOKEN_JWT = 'token_jwt';
  public static TOKENAC_JWT = 'tokenAC_jwt';
  public static IS_PAGE_RELOADED = 'is_page_reloaded';
  private static token: string | null = null;
  private static tokenAC: string | null = null;
  private isLogout: boolean = false;
  private _user?: UserInterface;

  constructor(
    private loginService: LoginService,
    private idleService: IdleService,
    private appReloadService: AppReloadService,
  ) {}

  public startIdleMonitor() {
    this.idleService.startMonitoring(() => this.handleInactivityLogout());
  }

  public stopIdleMonitor() {
    this.idleService.stopMonitoring();
  }

  private async handleInactivityLogout(): Promise<void> {
    await this.resetToken();
    // 2) Trigger AppReload
    this.appReloadService.triggerReload();
  }

  public setTokenAC(tokenAC: string): void {
    sessionStorage.setItem(TokenService.TOKENAC_JWT, tokenAC);
    TokenService.tokenAC = tokenAC;
  }

  public setToken(token: string): void {
    sessionStorage.setItem(TokenService.TOKEN_JWT, token);
    TokenService.token = token;
  }

  public static get getToken(): string {
    const token = sessionStorage.getItem(TokenService.TOKEN_JWT);
    TokenService.token = TokenService.token || token;
    return TokenService.token || '';
  }

  public static get getTokenAC(): string {
    const tokenAC = sessionStorage.getItem(TokenService.TOKENAC_JWT);
    TokenService.tokenAC = TokenService.tokenAC || tokenAC;
    return TokenService.tokenAC || '';
  }

  public static get headersTokenJwt(): { [name: string]: string } {
    return { Authorization: `Bearer ${this.getToken}` };
  }

  public static get params(): { [name: string]: string } {
    return { lang: I18nService.getLang };
  }

  public static get headersTokenACJwt(): { [name: string]: string } {
    return { Authorization: `Bearer ${this.getTokenAC}` };
  }

  public static get userJwt(): UserTokenInterface | null {
    try {
      const decodedToken = decodeJwt(TokenService.getToken ?? '');
      const userToken: UserTokenInterface = {
        uid: (decodedToken['user_id'] as number) ?? 0,
        type: (decodedToken['type'] as string) ?? '',
        roles: (decodedToken['roles'] as string[]) ?? [],
        iat: (decodedToken['iat'] as number) ?? 0,
        exp: (decodedToken['exp'] as number) ?? 0,
      };
      return userToken;
    } catch (error) {
      return null;
    }
  }

  public async resetToken(): Promise<void> {
    try {
      if (TokenService?.getToken && TokenService?.getTokenAC && !this.isLogout) {
        this.isLogout = true;
        await this.loginService.logout();
        this._user = undefined;
        this.isLogout = false;
      }
    } catch (error) {
      this.isLogout = false;
    }
    TokenService.token = null;
    TokenService.tokenAC = null;
    this.stopIdleMonitor();
    sessionStorage.clear();
  }

  public async checkReloadPage() {
    if (['dev', 'qa'].includes(environment.envName)) return;
    if (sessionStorage.getItem(TokenService.IS_PAGE_RELOADED) && TokenService.getToken && TokenService.getTokenAC) {
      await this.resetToken();
      this.appReloadService.triggerReload();
    }
  }

  public static isLogged() {
    return !!TokenService.getToken;
  }

  public async user(): Promise<UserInterface> {
    if (!this._user) {
      const user = await firstValueFrom(this.usersService.userQuery());
      this._user = {
        id: user.data.user.id,
        email: user.data.user.email,
        fullname: user.data.user.fullName,
        identityIdList: user.data.user.identityIdList,
        type: user.data.user.type,
        documentType: user.data.user.documentType,
      };
    }
    return this._user;
  }

  public static hasRole(requiredRole: string | string[]): boolean {
    const userRoles = this.userJwt?.roles ?? [];
    if (Array.isArray(requiredRole)) {
      return requiredRole.some((role) => userRoles.includes(role));
    } else {
      return userRoles.includes(requiredRole);
    }
  }
}
