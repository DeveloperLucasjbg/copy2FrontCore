import { Component, input } from '@angular/core';

@Component({
  selector: 'app-modalities-garantia',
  standalone: true,
  imports: [],
  templateUrl: './modalities-garantia.component.html',
  styleUrl: './modalities-garantia.component.css'
})
export class ModalitiesGarantiaComponent {
  modalities = input.required<{
    title: string;
    columnA: {
      title: string;
      items: {
        title: string;
      }[];
    };
    columnB: {
      title: string;
      items: {
        title: string;
      }[];
    };
  }>();
}
