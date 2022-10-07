//#region Imports

import { Component } from '@angular/core';
import { CreateUserPayload } from '../../models/payload/create-user.payload';
import { UserService } from '../../services/user.service';

//#endregion

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  //#region Constructors

  constructor(
    private readonly userService: UserService,
  ) { }

  //#endregion

  //#region Properties

  public createUser: CreateUserPayload = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  public errorMessage: string = '';

  public base64UserImage: string = '';

  public isRegistering: boolean = false;

  //#endregion

  //#region Methods

  public selectImage($event: any): void {
    const file: File = $event.target.files[0];

    const permissionTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!permissionTypes.includes(file.type))
      return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64UserImage = reader.result as string;
    };
  }

  public async registerUser(): Promise<void> {
    if (this.isRegistering)
      return;

    try {
      this.isRegistering = true;
      await this.userService.createUser(this.createUser);

      this.errorMessage = '';
    } catch (e: any) {
      this.errorMessage = e.message;
    } finally {
      this.isRegistering = false;
    }
  }

  //#endregion

}
