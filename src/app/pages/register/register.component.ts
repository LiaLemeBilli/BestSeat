//#region Imports

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserPayload } from '../../models/payloads/create-user.payload';
import { UserService } from '../../services/user.service';
import { isValidEmail } from '../../utils/functions';

//#endregion

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  //#region Constructors

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
  ) { }

  //#endregion

  //#region Properties

  public createUser: CreateUserPayload = {
    name: '',
    email: '',
    password: '',
    imageUrl: '',
    confirmPassword: '',
  }

  public errorMessage: string = '';

  public userImage: string = '';

  public isRegistering: boolean = false;

  public avatarTimer: any;

  //#endregion

  //#region Methods

  public async ngOnInit(): Promise<void> {
    try {
      const user = await this.userService.getCurrentUser();

      if (user)
        await this.router.navigateByUrl('\home');
    } finally {}
  }

  public selectImage($event: any): void {
    const file: File = $event.target.files[0];

    const permissionTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!permissionTypes.includes(file.type))
      return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.userImage = reader.result as string;
    };
  }

  public async registerUser(): Promise<void> {
    if (this.isRegistering)
      return;

    try {
      this.isRegistering = true;

      if (this.createUser.imageUrl === '')
        delete this.createUser.imageUrl;

      await this.userService.createUser(this.createUser);
      delete this.createUser.confirmPassword;

      await this.userService.login({ username: this.createUser.email, password: this.createUser.password });
      await this.router.navigateByUrl('\home');

      this.errorMessage = '';
    } catch (e: any) {
      this.errorMessage = e.message;
    } finally {
      this.isRegistering = false;
    }
  }

  public async getAvatarUrl(): Promise<void> {
    if (this.avatarTimer !== null)
      clearTimeout(this.avatarTimer);

    this.avatarTimer = setTimeout(async () => {
      if (!isValidEmail(this.createUser.email))
        return;

      this.userImage = await this.userService.getAvatarByEmail(this.createUser.email)
    }, 400);
  }

  //#endregion

}
