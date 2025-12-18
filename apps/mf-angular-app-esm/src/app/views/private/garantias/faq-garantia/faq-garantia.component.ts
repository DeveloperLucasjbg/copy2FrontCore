import { Component, input } from '@angular/core';

@Component({
  selector: 'app-faq-garantia',
  standalone: true,
  imports: [],
  templateUrl: './faq-garantia.component.html',
  styleUrl: './faq-garantia.component.css'
})
export class FaqGarantiaComponent {
  faq = input.required<{
    title: string;
    description: string;
  }>();
}
