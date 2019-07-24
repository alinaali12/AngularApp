import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispalyemployeeComponent } from './dispalyemployee.component';

describe('DispalyemployeeComponent', () => {
  let component: DispalyemployeeComponent;
  let fixture: ComponentFixture<DispalyemployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispalyemployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispalyemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
