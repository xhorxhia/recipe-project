import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResipesListComponent } from './resipes-list.component';

describe('ResipesListComponent', () => {
  let component: ResipesListComponent;
  let fixture: ComponentFixture<ResipesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResipesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResipesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
