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
  public backgroundImage: string = 'assets/imgs/register-card-image.jpg';

  @Input()
  public courseName: string = 'Curso com tecnicas de pintura digital e forma';

  @Input()
  public tagName: string = 'Artes';

  //#endregion

}
