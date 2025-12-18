import { ChangeDetectionStrategy, Component } from "@angular/core";
import { OnboardingLayoutComponent } from "../../shared/ui";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "mfapp-broker-registry",
  standalone: true,
  imports: [OnboardingLayoutComponent, RouterOutlet],
  templateUrl: "./broker-registry.component.html",
  styleUrl: "./broker-registry.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrokerRegistryComponent {}
