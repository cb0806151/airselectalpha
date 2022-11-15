import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursorPadComponent } from './cursor-pad.component';

describe('CursorPadComponent', () => {
  let component: CursorPadComponent;
  let fixture: ComponentFixture<CursorPadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursorPadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursorPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
