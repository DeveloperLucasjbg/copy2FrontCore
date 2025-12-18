import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './layouts/private-layout/private-layout.component';
import { LoginComponent } from '@views/public';
import { RecoverPasswordComponent } from '@views/public/recover-password/recover-password.component';
import { ChangePasswordTokenComponent } from '@views/public/change-password-token/change-password-token.component';
import { PublicGuard } from '@core/guards/public.guard';
import { ProductComponent } from '@views/private/product/product.component';
import { HomeComponent } from '@views/public/home/home.component';
import { GarantiasComponent } from '@views/private/garantias/garantias.component';

export const routes: Routes = [
  // PUBLIC ROUTES (sin autenticación)
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: LoginComponent.PATH,
        component: LoginComponent,
      },
      {
        path: RecoverPasswordComponent.PATH,
        component: RecoverPasswordComponent,
      },
      {
        path: ChangePasswordTokenComponent.PATH.concat('/:token'),
        canActivate: [PublicGuard],
        component: ChangePasswordTokenComponent,
      },
      {
        path: ProductComponent.PATH.concat('/:productId'),
        component: ProductComponent,
      },
    ]
  },
  // PRIVATE ROUTES (requieren autenticación)
  {
    path: '',
    component: PrivateLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'produtos/garantia',
        component: GarantiasComponent
      },
      {
        path: 'produtos/seguro-patrimonial',
        component: GarantiasComponent
      },
      {
        path: 'produtos/riscos-engenharia',
        component: GarantiasComponent
      },
      {
        path: 'produtos/riscos-diversos',
        component: GarantiasComponent
      },
      {
        path: 'nova-cotacao',
        component: HomeComponent
      },
      {
        path: 'novo-endoso',
        component: HomeComponent
      },
      {
        path: 'cotacoes-propostas',
        component: HomeComponent
      },
      {
        path: 'apolices-endossos',
        component: HomeComponent
      },
      {
        path: 'tomadores',
        component: HomeComponent
      },
      {
        path: 'financeira',
        component: HomeComponent
      },
      {
        path: 'sinistros',
        component: HomeComponent
      }
    ]
  },
];
