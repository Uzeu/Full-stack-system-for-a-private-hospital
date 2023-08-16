import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaznoLekarComponent } from './razno-lekar.component';

describe('RaznoLekarComponent', () => {
  let component: RaznoLekarComponent;
  let fixture: ComponentFixture<RaznoLekarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaznoLekarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaznoLekarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
