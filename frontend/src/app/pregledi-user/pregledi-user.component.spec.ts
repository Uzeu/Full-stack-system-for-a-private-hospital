import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreglediUserComponent } from './pregledi-user.component';

describe('PreglediUserComponent', () => {
  let component: PreglediUserComponent;
  let fixture: ComponentFixture<PreglediUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreglediUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreglediUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
