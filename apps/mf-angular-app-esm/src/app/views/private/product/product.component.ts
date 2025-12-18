import { Component } from '@angular/core';

@Component({
  selector: 'mfapp-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  public static PATH = 'produtos';
  public static PATH_PARAM_1 = '/:policyId';
}
