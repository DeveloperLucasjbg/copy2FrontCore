import { Component, input } from '@angular/core';
import { ButtonComponent } from '@avla/ui-design';
import { AssetUrlPipe } from '../../../../shared/pipes/asset-url.pipe';

@Component({
  selector: 'app-card-garantia',
  standalone: true,
  imports: [ButtonComponent, AssetUrlPipe],
  templateUrl: './card-garantia.component.html',
  styleUrl: './card-garantia.component.css'
})
export class CardGarantiaComponent {
  cards = input<{
    title: string;
    items: {
      icon?: string;
      title: string;
      description: string;
      buttonLabel: string;
    }[];
  } | undefined>();
}
