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

  public async login(payload: UserLoginPayload): Promise<UserProxy | undefined> {
    return await this.http.post<UserProxy>('auth/local', payload).toPromise().catch(error => {
      throw new Error(error.error.message);
    });
  }

  //#endregion

}
