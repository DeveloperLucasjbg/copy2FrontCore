import { Component, input } from '@angular/core';
import { AssetUrlPipe } from "../../../../shared/pipes/asset-url.pipe";

@Component({
  selector: 'app-home-card',
  standalone: true,
  imports: [AssetUrlPipe],
  templateUrl: './home-card.component.html',
  styleUrl: './home-card.component.css'
})
export class HomeCardComponent {
  title = input.required<string>();
  description = input.required<string>();
  image = input.required<string>();
}
