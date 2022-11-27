//#region Imports

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInteractor } from '../interactors/user/user.interactor';
import { CreateUserPayload } from '../models/payloads/create-user.payload';
import { UserLoginPayload } from '../models/payloads/user-login.payload';
import { UserProxy } from '../models/proxies/user.proxy';
import { isValidEmail, isValidPassword } from '../utils/functions';
import { StorageService } from './storage.service';

//#endregion

@Injectable({
  providedIn: 'root',
})
export class UserService {

  //#region Constructors

  constructor(
    private readonly interactor: UserInteractor,
    private readonly storageService: StorageService
  ) {}

  //#endregion

  //#region Private Properties

  private readonly user$: BehaviorSubject<UserProxy | undefined> = new BehaviorSubject<UserProxy | undefined>(void 0);

  //#endregion

  //#region Public Methods

  public getCurrentUser$(): Observable<UserProxy | undefined> {
    return this.user$.asObservable();
  }

  public setCurrentUser(user: UserProxy | undefined): void {
    this.user$.next(user);
  }

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

  public async login(payload: UserLoginPayload): Promise<UserProxy | undefined> {
    if (!isValidEmail(payload.username))
      throw new Error('Email invalido.');

    if (!isValidPassword(payload.password))
      throw new Error('Senha invalida.');

    const accessToken = await this.interactor.login(payload);
    const user = await this.interactor.getMe(accessToken!);

    this.storageService.setItem<UserProxy>('USER', user!);
    this.setCurrentUser(user);

    return user;
  }

  public getCurrentUser(): UserProxy | undefined {
    const user = this.storageService.getItem<UserProxy>('USER');

    if (user.success)
      return user.success;

    return undefined;
  }

  public async getAvatarByEmail(email: string): Promise<string> {
    return await this.interactor.getAvatarEmail(email);
  }

  public logout(): void {
    this.storageService.clear();
    this.setCurrentUser(undefined);
  }

  //#endregion

}
