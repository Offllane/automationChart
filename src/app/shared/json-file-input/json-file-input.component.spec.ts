import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonFileInputComponent } from './json-file-input.component';

describe('JsonFileInputComponent', () => {
  let component: JsonFileInputComponent;
  let fixture: ComponentFixture<JsonFileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonFileInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonFileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
