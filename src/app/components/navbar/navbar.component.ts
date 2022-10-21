//#region Imports

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavbarInterface } from '../../models/interfaces/navbar.interface';

//#endregion

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  //#region Properties

  @Input()
  public menuList: NavbarInterface[] = [];

  @Input()
  public activatedMenu: NavbarInterface | null = null;

  @Output()
  public onChangeActivatedMenu: EventEmitter<NavbarInterface> = new EventEmitter<NavbarInterface>();

  //#endregion

}
