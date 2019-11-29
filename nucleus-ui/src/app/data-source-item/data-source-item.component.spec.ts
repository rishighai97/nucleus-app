import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSourceItemComponent } from './data-source-item.component';

describe('DataSourceItemComponent', () => {
  let component: DataSourceItemComponent;
  let fixture: ComponentFixture<DataSourceItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSourceItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSourceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
