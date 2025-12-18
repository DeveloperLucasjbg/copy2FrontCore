import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { identityIdList, user, userFullName } from './schemas';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apollo = inject(Apollo);

  public user() {
    const result = this.apollo.watchQuery<userGeneric<user>>({
      query: user,
      fetchPolicy: 'no-cache',
    });
    return result;
  }
  public userQuery() {
    const result = this.apollo.query<userGeneric<user>>({
      query: user,
      fetchPolicy: 'no-cache',
    });
    return result;
  }
  public userFullName() {
    const result = this.apollo.query<userGeneric<userFullName>>({
      query: userFullName,
      fetchPolicy: 'no-cache',
    });
    return result;
  }
  public identityIdList() {
    const result = this.apollo.query<userGeneric<identityIdList>>({
      query: identityIdList,
      fetchPolicy: 'no-cache',
    });
    return result;
  }
}
export interface identityIdList {
  identityIdList: string[];
  documentType: string;
}
export interface userGeneric<T> {
  user: T;
}
export interface userFullName {
  fullName: string;
}
export interface user {
  id: number;
  fullName: string;
  type: string;
  idac: string;
  email: string;
  createdAt: Date;
  mandatoryChangePassword: boolean;
  identityIdList: string[];
  documentType: string;
}
