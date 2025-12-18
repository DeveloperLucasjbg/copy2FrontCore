import { Component, computed, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '@avla/ui-design';
import { AssetUrlPipe } from "../../../shared/pipes/asset-url.pipe";
import { GARANTIA_CONSTANTS, PANDC_PATRIMONIAL, RISCOS_DIVERSOS, RISCOS_ENGENHARIA } from '@shared/constants/garantia.constants';
import { GarantiaConstants } from '@interfaces/home.interface';
import { CardGarantiaComponent } from './card-garantia/card-garantia.component';
import { FaqGarantiaComponent } from './faq-garantia/faq-garantia.component';
import { ModalitiesGarantiaComponent } from './modalities-garantia/modalities-garantia.component';
import { RequirementsGarantiaComponent } from './requirements-garantia/requirements-garantia.component';

@Component({
  selector: 'app-garantias',
  standalone: true,
  imports: [AssetUrlPipe, ButtonComponent, CardGarantiaComponent, FaqGarantiaComponent, ModalitiesGarantiaComponent, RequirementsGarantiaComponent],
  templateUrl: './garantias.component.html',
  styleUrl: './garantias.component.css'
})
export class GarantiasComponent {
  private router = inject(Router);
  
  currentRoute = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.url)
    ),
    { initialValue: this.router.url }
  );

  garantiaConstants = computed<GarantiaConstants>(() => {
    const route = this.currentRoute();
    
    if (route?.includes('produtos/garantia')) {
      return GARANTIA_CONSTANTS;
    } else if (route?.includes('produtos/seguro-patrimonial')) {
      return PANDC_PATRIMONIAL;
    } else if (route?.includes('produtos/riscos-engenharia')) {
      return RISCOS_ENGENHARIA;
    } else if (route?.includes('produtos/riscos-diversos')) {
      return RISCOS_DIVERSOS;
    }
    
    return GARANTIA_CONSTANTS;
  });
}
