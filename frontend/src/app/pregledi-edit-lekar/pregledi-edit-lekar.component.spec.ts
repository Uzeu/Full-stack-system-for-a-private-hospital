import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreglediEditLekarComponent } from './pregledi-edit-lekar.component';

describe('PreglediEditLekarComponent', () => {
  let component: PreglediEditLekarComponent;
  let fixture: ComponentFixture<PreglediEditLekarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreglediEditLekarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreglediEditLekarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
