import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        RegisterComponent
      ],
    }).compileComponents();
  });

  it('should create', () => {
    expect(RegisterComponent).toBeTruthy();
  });
});
