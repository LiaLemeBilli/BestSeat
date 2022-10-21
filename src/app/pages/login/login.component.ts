//#region Imports

import { Component } from '@angular/core';
import { CreateUserPayload } from '../../models/payloads/create-user.payload';
import { UserService } from '../../services/user.service';

//#endregion

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  //#region Constructors

  constructor(
    private readonly userService: UserService,
  ) { }

  //#endregion

  //#region Properties

  public createUser: CreateUserPayload = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  public errorMessage: string = '';

  public isLoading: boolean = false;

  //#endregion

  //#region Methods

  public async loginUser(): Promise<void> {
    if (this.isLoading)
      return;

    try {
      this.isLoading = true;
      await this.userService.createUser(this.createUser);

      this.errorMessage = '';
    } catch (e: any) {
      this.errorMessage = e.message;
    } finally {
      this.isLoading = false;
    }
  }

  //#endregion

}
