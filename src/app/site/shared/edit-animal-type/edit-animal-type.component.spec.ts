import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnimalTypeComponent } from './edit-animal-type.component';

describe('EditAnimalTypeComponent', () => {
  let component: EditAnimalTypeComponent;
  let fixture: ComponentFixture<EditAnimalTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAnimalTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAnimalTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
