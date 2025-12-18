import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalitiesGarantiaComponent } from './modalities-garantia.component';

describe('ModalitiesGarantiaComponent', () => {
  let component: ModalitiesGarantiaComponent;
  let fixture: ComponentFixture<ModalitiesGarantiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalitiesGarantiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalitiesGarantiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
