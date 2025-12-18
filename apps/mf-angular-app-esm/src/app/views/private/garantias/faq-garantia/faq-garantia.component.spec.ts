import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqGarantiaComponent } from './faq-garantia.component';

describe('FaqGarantiaComponent', () => {
  let component: FaqGarantiaComponent;
  let fixture: ComponentFixture<FaqGarantiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqGarantiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqGarantiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
