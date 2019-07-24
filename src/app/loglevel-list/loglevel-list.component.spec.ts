import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoglevelListComponent } from './loglevel-list.component';

describe('LoglevelListComponent', () => {
  let component: LoglevelListComponent;
  let fixture: ComponentFixture<LoglevelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoglevelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoglevelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
