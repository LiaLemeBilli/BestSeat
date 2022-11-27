//#region Imports

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserPayload } from '../../models/payloads/create-user.payload';
import { UserLoginPayload } from '../../models/payloads/user-login.payload';
import { UserProxy } from '../../models/proxies/user.proxy';

//#endregion

@Injectable({
  providedIn: 'root',
})
export class UserInteractor {

  //#region Constructors

  constructor(
    private readonly http: HttpClient
  ) {}

  //#endregion

  //#region Public Methods

  public async createUser(payload: CreateUserPayload): Promise<UserProxy | undefined> {
    return await this.http.post<UserProxy>('user', payload).toPromise().catch(error => {
      throw new Error(error.error.message);
    });
  }

  public async login(payload: UserLoginPayload): Promise<string | undefined> {
    return await this.http.post<{ accessToken: string }>('auth/local', payload).toPromise().catch(error => {
      throw new Error(error.error.message);
    }).then(r => r!.accessToken);
  }

  public async getAvatarEmail(email: string): Promise<string> {
    return await this.http.get<{ imageUrl: string }>('user/avatar/' + encodeURIComponent(email)).toPromise().catch(error => {
      throw new Error(error.error.message);
    }).then(r => r!.imageUrl);
  }

  public async getMe(accessToken: string): Promise<UserProxy | undefined> {
    return await this.http.get<UserProxy>('user/me', { headers: { Authorization: 'Bearer ' + accessToken } }).toPromise().catch(error => {
      throw new Error(error.error.message);
    });
  }

  //#endregion

}
