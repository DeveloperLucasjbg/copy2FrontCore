import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UserInfo } from "@avla/ui-design";
import { CommonModule } from "@angular/common";
import { AssetUrlPipe } from "../../../shared/pipes/asset-url.pipe";
import { HomeCardComponent } from "./home-card/home-card.component";
import { homeCard } from "@shared/constants";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, AssetUrlPipe, HomeCardComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  user: UserInfo = { 
    name: "Daniel Espinoza", 
    avatarUrl: "avatar.svg"
  };

  homeCard = homeCard;
}
