import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilLekarViewComponent } from './profil-lekar-view.component';

describe('ProfilLekarViewComponent', () => {
  let component: ProfilLekarViewComponent;
  let fixture: ComponentFixture<ProfilLekarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilLekarViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilLekarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
