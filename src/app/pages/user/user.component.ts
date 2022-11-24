//#region Imports

import { Component, OnInit } from '@angular/core';
import { UserLoginPayload } from '../../models/payloads/user-login.payload';

//#endregion

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  //#region Constructors

  constructor() { }

  //#endregion

  //#region Properties

  public userLogin: UserLoginPayload = {
    email: '',
    password: '',
  }

  public errorMessage: string = '';

  public isLoading: boolean = false;

  //#endregion

  //#region Methods

  public async ngOnInit(): Promise<void> { }

  //#endregion

}
