import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilUserViewComponent } from './profil-user-view.component';

describe('ProfilUserViewComponent', () => {
  let component: ProfilUserViewComponent;
  let fixture: ComponentFixture<ProfilUserViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilUserViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
