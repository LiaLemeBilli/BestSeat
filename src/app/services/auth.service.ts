//#region Imports

import { Injectable } from '@angular/core';
import { UserInteractor } from '../interactors/user/user.interactor';
import { UserLoginPayload } from '../models/payloads/user-login.payload';
import { UserProxy } from '../models/proxies/user.proxy';
import { isValidEmail, isValidPassword } from '../utils/functions';
import { StorageService } from './storage.service';
import { UserService } from './user.service';

//#endregion

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  //#region Constructors

  constructor(
    private readonly interactor: UserInteractor,
    private readonly storageService: StorageService,
    private readonly userService: UserService,
  ) {}

  //#endregion

  //#region Public Methods

  public async login(payload: UserLoginPayload): Promise<UserProxy | undefined> {
    if (!isValidEmail(payload.username))
      throw new Error('Email invalido.');

    if (!isValidPassword(payload.password))
      throw new Error('Senha invalida.');

    const user = await this.interactor.login(payload);

    if (user) {
      this.storageService.setItem<UserProxy>('USER', user);
      this.userService.setCurrentUser(user);
    }

    return user;
  }

  //#endregion

}
