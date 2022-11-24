//#region Imports

import { Component, Input } from '@angular/core';

//#endregion

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent {

  //#region Public Methods

  @Input()
  public backgroundImage: string = '';

  @Input()
  public courseName: string = '';

  @Input()
  public tagName: string | undefined = '';

  //#endregion

}
