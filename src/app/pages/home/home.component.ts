//#region Imports

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CreateUserPayload } from '../../models/payloads/create-user.payload';
import { UserProxy } from '../../models/proxies/user.proxy';
import { UserService } from '../../services/user.service';

//#endregion

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy, OnInit {

  //#region Constructors

  constructor(
    private readonly userService: UserService,
  ) {
    this.userSubscription = this.userService.getCurrentUser$().subscribe(user => {
      this.user = user;

      if (this.user)
        this.isLogged = true;
    })
  }

  //#endregion

  //#region Properties

  public user: UserProxy | undefined = undefined;

  public isLogged: boolean = false;

  private userSubscription: Subscription;

  //#endregion

  //#region Methods

  public ngOnInit(): void {
    this.user = this.userService.getCurrentUser();

    if (this.user)
      this.isLogged = true;
  }

  public ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  //#endregion

}
