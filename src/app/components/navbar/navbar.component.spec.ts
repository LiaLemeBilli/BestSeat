import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadingComponent } from '../loading/loading.component';
import { NavbarComponent } from './navbar.component';

describe('LoadingComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        NavbarComponent
      ],
    }).compileComponents();
  });

  it('should create', () => {
    expect(NavbarComponent).toBeTruthy();
  });
});
