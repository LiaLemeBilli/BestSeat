//#region Imports

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserPayload } from '../../models/payloads/create-user.payload';
import { UserLoginPayload } from '../../models/payloads/user-login.payload';
import { UserService } from '../../services/user.service';

//#endregion

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  //#region Constructors

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
  ) { }

  //#endregion

  //#region Properties

  public userLogin: UserLoginPayload = {
    username: '',
    password: '',
  }

  public errorMessage: string = '';

  public isLoading: boolean = false;

  //#endregion

  //#region Methods

  public async ngOnInit(): Promise<void> {
    try {
      const user = await this.userService.getCurrentUser();

      if (user)
        await this.router.navigateByUrl('\home');
    } finally {}
  }

  public async loginUser(): Promise<void> {
    if (this.isLoading)
      return;

    try {
      this.isLoading = true;
      const user = await this.userService.login(this.userLogin);
      this.errorMessage = '';

      if (user)
        await this.router.navigateByUrl('/home');
    } catch (e: any) {
      this.errorMessage = e.message;
    } finally {
      this.isLoading = false;
    }
  }

  //#endregion

}
