import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@services';
import { LoginBody, ResponseCommon } from '@interfaces';
import { AuthService } from '../graph-ql/auth.service';

@Injectable({ providedIn: 'root' })
export class LoginService extends HttpService {
  private EXTERNAL_LOGIN = 'v1/externalLogin';
  private EXTERNAL_LOGOUT = 'v1/externalLogout';

  constructor(private _http: HttpClient, private authService: AuthService) {
    super();
  }

  async login(body: LoginBody): Promise<string | undefined> {
    const result = await firstValueFrom<ResponseCommon<string>>(
      this._http.post(this.getUrl(`${this.EXTERNAL_LOGIN}`), body),
    );
    return result.payload;
  }

  async logout(): Promise<any> {
    const result = await firstValueFrom(this.authService.logout());
    return result;
  }
}
