import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetSearchByComponent } from './pet-search-by.component';

describe('PetSearchByComponent', () => {
  let component: PetSearchByComponent;
  let fixture: ComponentFixture<PetSearchByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetSearchByComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetSearchByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
