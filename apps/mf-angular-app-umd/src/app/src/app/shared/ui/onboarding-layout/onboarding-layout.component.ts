import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "onboarding-layout",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./onboarding-layout.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "block" },
})
export class OnboardingLayoutComponent {}
