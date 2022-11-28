//#region Imports

import { Component, OnInit } from '@angular/core';
import { Ngxalert } from 'ngx-dialogs';
import { ToastrService } from 'ngx-toastr';
import { creationRecordButton, creationRecordText, CreationStatusEnum } from '../../models/enum/creation-status.enum';
import { CoursePayload } from '../../models/payloads/course.payload';
import { LessonPayload } from '../../models/payloads/lessonPayload';
import { ModulePayload } from '../../models/payloads/module.payload';
import { CourseModuleProxy } from '../../models/proxies/course-module.proxy';
import { CourseProxy } from '../../models/proxies/course.proxy';
import { LessonProxy } from '../../models/proxies/lesson.proxy';
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

  public isLoadingCourseList: boolean = false;

  public isLoadingModuleList: boolean = false;

  public isLoadingLessonList: boolean = false;

  public isManagingLessons: boolean = false;

  public isManagingModules: boolean = false;

  public isCreatingOrEditingCourse: boolean = false;

  public isCreatingOrUpdatingModule: boolean = false;

  public isCreatingOrUpdatingLesson: boolean = false;

  public isLoadingCourseToEdit: boolean = false;

  public courseList: CourseProxy[] = [];

  public moduleList: CourseModuleProxy[] = [];

  public lessonList: LessonProxy[] = [];

  public course: CoursePayload = {
    id: null,
    author: '',
    category: '',
    description: '',
    name: '',
  }

  public module: ModulePayload = {
    id: null,
    title: '',
    courseId: 0,
  }

  public lesson: LessonPayload = {
    id: null,
    title: '',
    videoUrl: '',
    description: '',
    courseModuleId: 0,
  }

  public alertDialog: Ngxalert = new Ngxalert;

  public creationStatusEnum: typeof CreationStatusEnum = CreationStatusEnum;

  public courseCreationStatus: CreationStatusEnum = CreationStatusEnum.NONE;

  public lessonCreationStatus: CreationStatusEnum = CreationStatusEnum.NONE;

  public moduleCreationStatus: CreationStatusEnum = CreationStatusEnum.NONE;

  public creationRecordTextLocal = creationRecordText;

  public creationRecordButtonLocal = creationRecordButton;

  public isValidImage: boolean = false;

  //#endregion

  //#region Methods

  public async ngOnInit(): Promise<void> {
    await this.loadCourses();
  }

  public async editCourse(courseId: number | undefined): Promise<void> {
    if (!courseId)
      return;

    try {
      this.isLoadingCourseToEdit = true;
      this.course = await this.courseService.get(courseId) as CoursePayload;
      this.courseCreationStatus = CreationStatusEnum.UPDATING;

      this.toastrService.info('Você entrou no modo de edição de curso!', 'Olá');
    } catch (e: any) {
      this.toastrService.error(e.message, 'Atenção!');
    } finally {
      this.isLoadingCourseToEdit = false;
    }
  }

  public activeEditeModule(module: CourseModuleProxy): void {
    this.module.id = module.id;
    this.module.title = module.title;

    this.moduleCreationStatus = CreationStatusEnum.UPDATING;
  }

  public activeEditeLesson(lesson: LessonProxy): void {
    this.lesson.id = lesson.id;
    this.lesson.description = lesson.description;
    this.lesson.title = lesson.title;
    this.lesson.videoUrl = lesson.videoUrl.toString();

    this.lessonCreationStatus = CreationStatusEnum.UPDATING;
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

  public async activeLessonCrudAndLoadLessonsByModule(module?: CourseModuleProxy): Promise<void> {
    if (module) {
      this.module.id = module.id;
      this.module.title = module.title;
    }

    this.isManagingLessons = true;

    try {
      if (!this.module.id)
        return;

      this.isLoadingLessonList = true;
      this.lessonList = await this.courseService.getLessonByModule(this.module.id) || [];
    } catch (e: any) {
      this.toastrService.error(e.message, 'Atenção!');
    } finally {
      this.isLoadingLessonList = false;
    }
  }

  public async activeModuleCrudAndLoadModulesByCourse(): Promise<void> {
    this.isManagingModules = true;

    try {
      if (!this.course.id)
        return;

      this.isLoadingModuleList = true;
      this.moduleList = await this.courseService.getModulesByCourse(this.course.id) || [];
    } catch (e: any) {
      this.toastrService.error(e.message);
    } finally {
      this.isLoadingModuleList = false;
    }
  }

  public openFormsToCreateNewCourse(): void {
    this.course = {
      author: '',
      name: '',
      description: '',
      category: '',
      id: null,
      imageUrl: '',
    }
    this.courseCreationStatus = CreationStatusEnum.CREATING;

    this.toastrService.info(' Você entrou no modo de criação de curso!', 'Olá');
  }

  public async deleteModule(moduleId: number | undefined): Promise<void> {
    try {
      if (!moduleId)
        return;

      this.alertDialog.create({
        id: 'alert',
        title: 'Deseja remover esse modulo?',
        message: 'Atenção, essa ação não poderá ser desfeita.',
        customCssClass: 'dialog-class',
        strict: false,
        type: 'M',
        buttons : [
          {
            title : 'Remover',
            class: 'dialog-class--cancel',
            event : async () => {
              await this.courseService.deleteModule(moduleId);
              await this.activeModuleCrudAndLoadModulesByCourse();
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
    } catch (e: any) {
      this.toastrService.error(e.message);
    }
  }

  public async deleteLesson(lessonId: number | undefined): Promise<void> {
    try {
      if (!lessonId)
        return;

      this.alertDialog.create({
        id: 'alert',
        title: 'Deseja remover essa aula?',
        message: 'Atenção, essa ação não poderá ser desfeita.',
        customCssClass: 'dialog-class',
        strict: false,
        type: 'M',
        buttons : [
          {
            title : 'Remover',
            class: 'dialog-class--default',
            event : async () => {
              await this.courseService.deleteLesson(lessonId);
              await this.activeLessonCrudAndLoadLessonsByModule();
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
    } catch (e: any) {
      this.toastrService.error(e.message);
    }
  }

  public async deleteCourse(courseId?: number | null): Promise<void> {
    try {
      if (!courseId)
        return;

      this.alertDialog = new Ngxalert;;
      this.alertDialog.create({
        id: 'alert',
        title: 'Deseja remover esse curso?',
        message: 'Atenção, essa ação não poderá ser desfeita.',
        customCssClass: 'dialog-class',
        strict: false,
        type: 'M',
        buttons : [
          {
            title : 'Remover',
            class: 'dialog-class--cancel',
            event : () => {
              this.courseService.delete(courseId).then(() => {
                this.loadCourses().then(() => {
                  this.courseCreationStatus = CreationStatusEnum.NONE;
                  this.alertDialog.removeAlert('alert');
                });
              });
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
    } catch (e: any) {
      this.toastrService.error(e.message);
    }
  }

  public async createOrUpdateCourse(): Promise<void> {
    if (this.isCreatingOrEditingCourse)
      return;

    try {
      this.isCreatingOrEditingCourse = true;
      this.checkCourseInformation();

      if (this.courseCreationStatus === CreationStatusEnum.CREATING) {
        delete this.course.id;

        if (!this.isValidImage)
          throw new Error('Imagem invalida!');

        const course = await this.courseService.create(this.course);

        if (course && course?.id)
          this.course.id = course.id;

        this.toastrService.success('Curso criado com sucesso!');
        this.courseCreationStatus = CreationStatusEnum.UPDATING;
      }

      if (this.courseCreationStatus === CreationStatusEnum.UPDATING && this.course.id) {
        await this.courseService.update(this.course.id, this.course);

        this.toastrService.success('Curso atualizado com sucesso!');
      }

      await this.loadCourses();
    } catch (e: any) {
      this.toastrService.error(e.message);
    } finally {
      this.isCreatingOrEditingCourse = false;
    }
  }

  public async createOrUpdateModule(): Promise<void> {
    if (this.isCreatingOrUpdatingModule)
      return;

    try {
      this.isCreatingOrUpdatingModule = true;
      this.checkModuleInformation();

      if (this.moduleCreationStatus === CreationStatusEnum.CREATING) {
        delete this.module.id;

        if (this.course.id)
          this.module.courseId = this.course.id;

        await this.courseService.createModule(this.module);

        this.toastrService.success('Modulo criado com sucesso!');
      }

      if (this.moduleCreationStatus === CreationStatusEnum.UPDATING && this.module.id) {
        await this.courseService.updateModule(this.module.id, this.module);

        this.toastrService.success('Modulo atualizado com sucesso!');
      }

      this.module = {
        id: null,
        title: '',
        courseId: 0
      }

      this.moduleCreationStatus = CreationStatusEnum.NONE;
      await this.activeModuleCrudAndLoadModulesByCourse();
    } catch (e: any) {
      this.toastrService.error(e.message);
    } finally {
      this.isCreatingOrUpdatingModule = false;
    }
  }

  public async createOrUpdateLesson(): Promise<void> {
    if (this.isCreatingOrUpdatingLesson)
      return;

    try {
      this.isCreatingOrUpdatingLesson = true;
      this.checkLessonInformation();

      if (this.lessonCreationStatus === CreationStatusEnum.CREATING) {
        delete this.lesson.id;

        if (this.module.id)
          this.lesson.courseModuleId = this.module.id;

        await this.courseService.createLesson(this.lesson);

        this.toastrService.success('Aula criada com sucesso!');
        this.lessonCreationStatus = CreationStatusEnum.NONE;

        this.lesson = {
          id: null,
          title: '',
          description: '',
          videoUrl: '',
          courseModuleId: 0
        }
      }

      if (this.lessonCreationStatus === CreationStatusEnum.UPDATING && this.lesson.id) {
        await this.courseService.updateLesson(this.lesson.id, this.lesson);

        this.lesson = {
          id: null,
          title: '',
          description: '',
          videoUrl: '',
          courseModuleId: 0
        }

        this.toastrService.success('Aula atualizada com sucesso!');
        this.lessonCreationStatus = CreationStatusEnum.NONE;
      }

      this.moduleCreationStatus = CreationStatusEnum.NONE;
      await this.activeLessonCrudAndLoadLessonsByModule();
    } catch (e: any) {
      this.toastrService.error(e.message);
    } finally {
      this.isCreatingOrUpdatingLesson = false;
    }
  }

  public cancelModule(): void {
    this.module = {
      id: null,
      title: '',
      courseId: 0,
    }
    this.moduleCreationStatus = CreationStatusEnum.NONE;
  }

  public cancelLesson(): void {
    this.lesson = {
      id: null,
      title: '',
      description: '',
      videoUrl: '',
      courseModuleId: 0,
    }
    this.lessonCreationStatus = CreationStatusEnum.NONE;
  }

  public finishModuleEdit(): void {
    this.moduleList = [];
    this.isManagingModules = false;
    this.module = {
      id: null,
      title: '',
      courseId: 0,
    }
    this.moduleCreationStatus = CreationStatusEnum.NONE;
  }

  public finishLessonEdit(): void {
    this.lessonList = [];
    this.isManagingLessons = false;
    this.lesson = {
      id: null,
      title: '',
      description: '',
      videoUrl: '',
      courseModuleId: 0,
    }
    this.lessonCreationStatus = CreationStatusEnum.NONE;
  }

  private checkCourseInformation(): void {
    if (this.course.category?.length === 0)
      throw new Error('É necessário definir a categoria.');

    if (this.course.description?.length === 0)
      throw new Error('É necessário definir a descrição.');

    if (this.course.name?.length === 0)
      throw new Error('É necessário definir o none.');

    if (this.course.author?.length === 0)
      throw new Error('É necessário definir o autor.');
  }

  private checkModuleInformation(): void {
    if (this.module.title?.length === 0)
      throw new Error('É necessário definir o titulo do modulo.');
  }

  private checkLessonInformation(): void {
    if (this.lesson.title?.length === 0)
      throw new Error('É necessário definir o titulo da aula.');

    if (this.lesson.videoUrl?.length === 0)
      throw new Error('É necessário definir o URL da aula.');

    if (this.lesson.description?.length === 0)
      throw new Error('É necessário definir a descrição da aula.');
  }

  //#endregion

}
