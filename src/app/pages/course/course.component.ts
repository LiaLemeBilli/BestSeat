//#region Imports

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

//#endregion

@Component({
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {

  //#region Constructors

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
  ) { }

  //#endregion

  //#region Properties

  public course: any = {
    title: 'Typescript do básico ao avançado',
    category: [
      'Programação',
      'Tecnologia'
    ],
    description: 'Sua change é agora, aprenda umas das linguagens mais usadas' +
      'do mundo nesse curso, comece do básico para entender a estutura, e se torne' +
      'um mestre.'
  };

  public selectedModule: any = null;

  public selectedLesson: any = null;

  public modules: any[] = [
    {
      id: 0,
      title: 'Estrutura Typescript',
      lessons: [
        {
          id: 0,
          title: 'Como criar uma classe',
          videoLink: 'https://www.youtube.com/embed/LXb3EKWsInQ?controls=0'
        },
        {
          id: 1,
          title: 'Como criar uma interface',
          videoLink: 'https://www.youtube.com/embed/LXb3EKWsInQ?controls=0'
        },
        {
          id: 2,
          title: 'Como criar um enum',
          videoLink: 'https://www.youtube.com/embed/LXb3EKWsInQ?controls=0'
        }
      ]
    },
    {
      id: 1,
      title: 'Estrutura Typescript',
      lessons: [
        {
          id: 3,
          title: 'Como criar uma classe',
          videoLink: 'https://www.youtube.com/embed/LXb3EKWsInQ?controls=0'
        },
        {
          id: 4,
          title: 'Como criar uma interface',
          videoLink: 'https://www.youtube.com/embed/LXb3EKWsInQ?controls=0'
        },
        {
          id: 5,
          title: 'Como criar um enum',
          videoLink: 'https://www.youtube.com/embed/LXb3EKWsInQ?controls=0'
        }
      ]
    }
  ];

  public currentLesson = {
    title: 'Como criar uma classe.',
    videoLink: 'https://www.youtube.com/embed/LXb3EKWsInQ?controls=0'
  }

  //#endregion

  //#region Methods

  public async ngOnInit(): Promise<void> {
    try {
      const user = await this.userService.getCurrentUser();

      if (!user)
        await this.router.navigateByUrl('\home');
    } finally {}
  }

  public selectModule(module: any): void {
    if (this.selectedModule === module) {
      this.selectedLesson = null;
      this.selectedModule = null;
      return;
    }

    this.selectedModule = module;
    this.selectedLesson = this.selectedModule.lessons[0];
  }

  //#endregion

}
