//#region Imports

import { Component, Input } from '@angular/core';

//#endregion

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {

  //#region Properties

  @Input()
  public duration: number = 1000;

  @Input()
  public color: string = '#FFFFFF';

  @Input()
  public size: number = 60;

  //#endregion

}
