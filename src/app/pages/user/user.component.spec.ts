import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserComponent } from './user.component';

describe('LoginComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        UserComponent
      ],
    }).compileComponents();
  });

  it('should create', () => {
    expect(UserComponent).toBeTruthy();
  });
});
