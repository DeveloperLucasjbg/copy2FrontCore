import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementsGarantiaComponent } from './requirements-garantia.component';

describe('RequirementsGarantiaComponent', () => {
  let component: RequirementsGarantiaComponent;
  let fixture: ComponentFixture<RequirementsGarantiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequirementsGarantiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequirementsGarantiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
