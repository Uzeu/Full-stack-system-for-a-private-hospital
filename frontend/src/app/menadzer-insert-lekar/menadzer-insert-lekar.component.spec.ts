import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerInsertLekarComponent } from './menadzer-insert-lekar.component';

describe('MenadzerInsertLekarComponent', () => {
  let component: MenadzerInsertLekarComponent;
  let fixture: ComponentFixture<MenadzerInsertLekarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerInsertLekarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerInsertLekarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
