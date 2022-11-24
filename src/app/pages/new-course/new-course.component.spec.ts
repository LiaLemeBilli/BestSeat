import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NewCourseComponent } from './new-course.component';

describe('LoginComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        NewCourseComponent
      ],
    }).compileComponents();
  });

  it('should create', () => {
    expect(NewCourseComponent).toBeTruthy();
  });
});
