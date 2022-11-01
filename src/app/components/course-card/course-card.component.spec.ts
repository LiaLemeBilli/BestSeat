import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CourseCardComponent } from './course-card.component';

describe('CourseCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        CourseCardComponent
      ],
    }).compileComponents();
  });

  it('should create', () => {
    expect(CourseCardComponent).toBeTruthy();
  });
});
