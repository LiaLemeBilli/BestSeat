//#region Imports

import { Injectable } from '@angular/core';
import { UserInteractor } from '../interactors/user/user.interactor';
import { CreateUserPayload } from '../models/payloads/create-user.payload';
import { UserProxy } from '../models/proxies/user.proxy';
import { isValidEmail, isValidPassword } from '../utils/functions';

//#endregion

@Injectable({
  providedIn: 'root',
})
export class UserService {

  //#region Constructors

  constructor(
    private readonly interactor: UserInteractor,
  ) {

  }

  //#endregion

  //#region Public Properties

  //#endregion

  //#region Public Methods

  public async createUser(payload: CreateUserPayload): Promise<UserProxy | undefined> {
    if (payload.name === '')
      throw new Error('Nome invalido.');

    if (!isValidEmail(payload.email))
      throw new Error('Email invalido.');

    if (!isValidPassword(payload.password))
      throw new Error('Senha invalida.');

    if (payload.password !== payload.confirmPassword)
      throw new Error('As senhas devem ser iguais.');

    return await this.interactor.createUser(payload);
  }

  //#endregion

}
