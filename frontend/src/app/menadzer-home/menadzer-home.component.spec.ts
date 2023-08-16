import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerHomeComponent } from './menadzer-home.component';

describe('MenadzerHomeComponent', () => {
  let component: MenadzerHomeComponent;
  let fixture: ComponentFixture<MenadzerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
