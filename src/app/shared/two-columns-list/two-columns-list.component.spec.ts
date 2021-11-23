import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoColumnsListComponent } from './two-columns-list.component';

describe('TwoColumnsListComponent', () => {
  let component: TwoColumnsListComponent;
  let fixture: ComponentFixture<TwoColumnsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoColumnsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoColumnsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
