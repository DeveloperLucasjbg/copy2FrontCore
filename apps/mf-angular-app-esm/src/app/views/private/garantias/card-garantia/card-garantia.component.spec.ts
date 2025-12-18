import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGarantiaComponent } from './card-garantia.component';

describe('CardGarantiaComponent', () => {
  let component: CardGarantiaComponent;
  let fixture: ComponentFixture<CardGarantiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardGarantiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardGarantiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
