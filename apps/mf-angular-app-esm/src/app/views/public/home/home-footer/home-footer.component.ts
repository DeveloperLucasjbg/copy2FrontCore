import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { AssetUrlPipe } from "../../../../shared/pipes/asset-url.pipe";

@Component({
  selector: 'app-home-footer',
  standalone: true,
  imports: [AssetUrlPipe],
  templateUrl: './home-footer.component.html',
  styleUrl: './home-footer.component.css'
})
export class HomeFooterComponent {
  externalUrl = environment.externalLinks.general;

}
