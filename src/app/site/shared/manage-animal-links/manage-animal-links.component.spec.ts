import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAnimalLinksComponent } from './manage-animal-links.component';

describe('ManageAnimalLinksComponent', () => {
  let component: ManageAnimalLinksComponent;
  let fixture: ComponentFixture<ManageAnimalLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAnimalLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAnimalLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
