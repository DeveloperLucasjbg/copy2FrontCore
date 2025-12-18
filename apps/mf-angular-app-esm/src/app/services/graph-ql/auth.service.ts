import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginBody } from '@interfaces';
import { of } from 'rxjs';
import { APP_VERSION } from '@core/config/version';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  public login(authData: LoginBody, token: string) {
    return this.http.post(
      `${environment.API_URL}${environment.API_PATH}${environment.API_VERSION}/login`,
      authData,
      {
        headers: { captchaToken: token },
        params: {
          lang:'br'
        },
      },
    );
  }

  public logout() {
    return this.http.post(
      `${environment.API_URL}${environment.API_PATH}${environment.API_VERSION}/logout`,
      {},
    );
  }

  public passwordRecovery(email: string, token: string) {
    return this.http.post(
      `${environment.API_URL}${environment.API_PATH}${environment.API_VERSION}/password/recovery`,
      { email },
      {
        headers: { captchaToken: token },
      },
    );
  }

  public changePasswordWithToken(newPassword: string, token: string) {
    return this.http.put(
      `${environment.API_URL}${environment.API_PATH}${environment.API_VERSION}/password/change/${token}`,
      { newPassword },
    );
  }
}

export interface Login {
  email: string;
  password: string;
}
