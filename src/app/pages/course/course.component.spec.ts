import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CourseComponent } from './course.component';

describe('CourseComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        CourseComponent
      ],
    }).compileComponents();
  });

  it('should create', () => {
    expect(CourseComponent).toBeTruthy();
  });
});
