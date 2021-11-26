import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonFileExportComponent } from './json-file-export.component';

describe('JsonFileExportComponent', () => {
  let component: JsonFileExportComponent;
  let fixture: ComponentFixture<JsonFileExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonFileExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonFileExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
