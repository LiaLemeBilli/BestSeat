//#region Imports

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavbarInterface } from '../../models/interfaces/navbar.interface';
import { UserService } from '../../services/user.service';

//#endregion

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnDestroy, OnInit {

  //#region Constructor

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
  ) {
    this.userSubscription = this.userService.getCurrentUser$().subscribe(user => {
      if (user)
        this.isUserLogged = true;
    })
  }

  //#endregion

  //#region Properties

  @Input()
  public menuList: NavbarInterface[] = [];

  @Input()
  public activatedMenu: NavbarInterface | null = null;

  @Output()
  public onChangeActivatedMenu: EventEmitter<NavbarInterface> = new EventEmitter<NavbarInterface>();

  public isUserLogged: boolean = false;

  private userSubscription: Subscription;

  //#endregion

  //#region Public Methods

  public ngOnInit(): void {
    const user = this.userService.getCurrentUser();

    if (user)
      this.isUserLogged = true;
  }

  public async logoutOrLoginUser(): Promise<void> {
    if (this.isUserLogged)
      this.userService.logout();

    await this.router.navigateByUrl('\login')
  }

  public ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  //#endregion

}
