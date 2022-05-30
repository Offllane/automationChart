import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderWrapperComponent } from './loader-wrapper.component';

describe('LoaderWrapperComponent', () => {
  let component: LoaderWrapperComponent;
  let fixture: ComponentFixture<LoaderWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
