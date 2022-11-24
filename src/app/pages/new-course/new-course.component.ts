//#region Imports

import { Component, OnInit } from '@angular/core';
import { Ngxalert } from 'ngx-dialogs';
import { ToastrService } from 'ngx-toastr';
import {
  creationRecordButton,
  creationRecordColor,
  creationRecordText,
  CreationStatusEnum
} from '../../models/enum/creation-status.enum';
import { LessonPayload } from '../../models/payloads/lessonPayload';
import { CoursePayload } from '../../models/payloads/course.payload';
import { ModulePayload } from '../../models/payloads/module.payload';
import { CourseProxy } from '../../models/proxies/course.proxy';
import { CourseService } from '../../services/course.service';

//#endregion

@Component({
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss'],
})
export class NewCourseComponent implements OnInit {

  //#region Constructors

  constructor(
    private readonly courseService: CourseService,
    private readonly toastrService: ToastrService
  ) { }

  //#endregion

  //#region Properties

  public errorMessage: string = '';

  public isLoading: boolean = false;

  public isLoadingCourseList: boolean = false;

  public isCreatingOrEditing: boolean = false;

  public isLoadingCourseToEdit: boolean = false;

  public courseList: CourseProxy[] = [];

  public course: CoursePayload = {
    author: '',
    category: '',
    description: '',
    modules: [],
    name: '',
  }

  public courseIdToEdit: number = 0;

  public alertDialog: Ngxalert = new Ngxalert;

  public creationStatusEnum: typeof CreationStatusEnum = CreationStatusEnum;

  public creationStatus: CreationStatusEnum = CreationStatusEnum.TO_CREATE;

  public creationStatusText: Record<CreationStatusEnum, string> = creationRecordText;

  public creationStatusColor: Record<CreationStatusEnum, string> = creationRecordColor;

  public creationStatusButton: Record<CreationStatusEnum, string> = creationRecordButton;

  //#endregion

  //#region Methods

  public async ngOnInit(): Promise<void> {
    await this.loadCourses();
  }

  public addNewModule(): void {
    const moduleToAdd: ModulePayload = {
      id: null,
      title: '',
      lessons: [],
      order: 0,
      isOpened: false,
    }

    this.course.modules?.push(moduleToAdd);
  }

  public async editCourse(courseId: number | undefined): Promise<void> {
    if (!courseId)
      return;

    this.creationStatus = CreationStatusEnum.UPDATING;
    this.courseIdToEdit = courseId;

    try {
      this.isLoadingCourseToEdit = true;
      const course = await this.courseService.get(courseId) as CoursePayload;

      course.modules = course.modules?.map(module => {
        const newModule = module as ModulePayload;

        newModule.lessons = newModule.lessons?.map(lesson => {
          return lesson as LessonPayload;
        }) || [];

        return newModule;
      }) || [];

      this.course = course;
    } catch (e: any) {
      this.toastrService.error(e.message, 'Atenção!');
    } finally {
      this.isLoadingCourseToEdit = false;
    }
  }

  public addNewCourse(moduleIndex: number): void {
    const classToAdd: LessonPayload = {
      id: null,
      isOpened: false,
      name: '',
      description: '',
      contentUrl: '',
      order: 0,
    }

    if (this.course.modules)
      this.course.modules[moduleIndex].lessons?.push(classToAdd);
  }

  public removeClass(moduleIndex: number, classIndex: number): void {
    this.alertDialog.create({
      title: 'Deseja remover essa aula?',
      message: 'Atenção, essa ação não poderá ser desfeita.',
      customCssClass: 'dialog-class',
      buttons : [
        {
          title : 'Remover',
          class: 'dialog-class--default',
          event : () => {
            if (this.course.modules) {
              const newModule = this.course.modules[moduleIndex];

              if (newModule.lessons)
                newModule.lessons.splice(classIndex, 1);

              this.course.modules[moduleIndex] = newModule;
            }

            this.alertDialog.removeAlert('alert');
          }
        },
        {
          title : 'Cancelar',
          class: 'dialog-class--cancel',
          event : () => {
            this.alertDialog.removeAlert('alert');
          }
        },
      ]
    });
  }

  public removeModule(moduleIndex: number): void {
    this.alertDialog.create({
      id: 'alert',
      title: 'Deseja remover esse modulo?',
      message: 'Atenção, essa ação não poderá ser desfeita.',
      customCssClass: 'dialog-class',
      strict: true,
      type:'M',
      buttons : [
        {
          title : 'Remover',
          class: 'dialog-class--cancel',
          event : () => {
            if (this.course.modules && this.course.modules[moduleIndex])
              this.course.modules?.splice(moduleIndex, 1);

            this.alertDialog.removeAlert('alert');
          }
        },
        {
          title : 'Cancelar',
          class: 'dialog-class--confirm',
          event : () => {
            this.alertDialog.removeAlert('alert');
          }
        },
      ]
    });
  }

  public trackBy(index: number, value: any) {
    return index;
  }

  public changeStatus(status: CreationStatusEnum): void {
    this.creationStatus = status;
  }

  public async createOrUpdateCourse(): Promise<void> {
    try {
      this.isCreatingOrEditing = true;

      this.checkInvalidDataInPayload();

      if (this.creationStatus === CreationStatusEnum.CREATING) {
        await this.courseService.create(this.course);

        this.toastrService.success('Curso criado com sucesso!');
      }

      if (this.creationStatus === CreationStatusEnum.UPDATING) {
        await this.courseService.update(this.courseIdToEdit, this.course);

        this.toastrService.success('Curso atualizado com sucesso!');
      }

      this.course = {
        author: '',
        modules: [],
        name: '',
        description: '',
        category: ''
      }

      await this.loadCourses();
    } catch (e: any) {
      this.toastrService.error(e.message);
    } finally {
      this.isCreatingOrEditing = false;
    }
  }

  public checkInvalidDataInPayload(): void {
    if (this.course.name.length === 0)
      throw new Error('É necessário definir o nome do curso.');

    if (this.course.description.length === 0)
      throw new Error('É necessário definir a descrição do curso.');

    if (this.course.category === '')
      throw new Error('É necessário definir a categoria do curso.');

    if (!this.course.modules || this.course.modules.length === 0)
      throw new Error('É necessário enviar os modulos do curso.');

    if (this.course.modules) {
      this.course.modules.forEach((module, moduleIndex) => {
        if (module.title === '')
          throw new Error('É necessário enviar o titulo do modulo ' + moduleIndex + '.' );

        if (!module.lessons || module.lessons.length === 0)
          throw new Error('É necessário enviar as aulas do modulo ' + moduleIndex + '.' );

        if (module.lessons) {
          module.lessons.forEach((lesson, index) => {
            if (lesson.name.length === 0)
              throw new Error('É necessário enviar o nome da aula ' + index + 'presente no modulo '+ moduleIndex + '.' );

            if (lesson.description.length === 0)
              throw new Error('É necessário enviar a descrição da aula ' + index + 'presente no modulo '+ moduleIndex + '.' );

            if (lesson.contentUrl.length === 0)
              throw new Error('É necessário enviar a url da aula ' + index + 'presente no modulo '+ moduleIndex + '.' );
          });
        }
      })
    }
  }

  public disableStatus(): void {
    setTimeout(() => {
      this.creationStatus = CreationStatusEnum.TO_CREATE
    }, 100);

    this.course = {
      author: '',
      category: '',
      description: '',
      modules: [],
      name: '',
    }
  }

  public trackByClass(index: number, mClass: LessonPayload) {
    return mClass.description;
  }

  public async loadCourses(searchContent?: string): Promise<void> {
    try {
      this.isLoadingCourseList = true;
      const courses = await this.courseService.list(searchContent);

      this.courseList = courses ? courses : [];
    } catch (e: any) {
      this.toastrService.error(e.message, 'Atenção!');
    } finally {
      this.isLoadingCourseList = false;
    }
  }

  //#endregion

}
