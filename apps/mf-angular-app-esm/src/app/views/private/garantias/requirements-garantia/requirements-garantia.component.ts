import { Component, input } from '@angular/core';

@Component({
  selector: 'app-requirements-garantia',
  standalone: true,
  imports: [],
  templateUrl: './requirements-garantia.component.html',
  styleUrl: './requirements-garantia.component.css'
})
export class RequirementsGarantiaComponent {
  requirement = input.required<{
    title: string;
    description: string;
  }>();
  index = input.required<number>();
}
