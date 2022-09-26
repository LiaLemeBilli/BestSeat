//#region Imports

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserPayload } from '../../models/payload/create-user.payload';
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
    return await this.http.post<UserProxy>('users/create', payload).toPromise();
  }

  //#endregion

}
