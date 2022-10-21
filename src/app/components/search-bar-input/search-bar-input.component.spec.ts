import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadingComponent } from '../loading/loading.component';
import { SearchBarInputComponent } from './search-bar-input.component';

describe('LoadingComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        SearchBarInputComponent
      ],
    }).compileComponents();
  });

  it('should create', () => {
    expect(SearchBarInputComponent).toBeTruthy();
  });
});
