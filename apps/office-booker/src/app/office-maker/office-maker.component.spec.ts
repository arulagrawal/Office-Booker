import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeMakerComponent } from './office-maker.component';

describe('OfficeMakerComponent', () => {
  let component: OfficeMakerComponent;
  let fixture: ComponentFixture<OfficeMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfficeMakerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OfficeMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
