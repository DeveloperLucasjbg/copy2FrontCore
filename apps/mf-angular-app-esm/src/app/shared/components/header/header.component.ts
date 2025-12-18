import { Component } from '@angular/core';
import { AssetUrlPipe } from "../../pipes/asset-url.pipe";
import { CountrySelectComponent } from "../country-select/country-select.component";
import { SelectInterface } from '@avla/ui-design';
import { flagsSelection } from '@shared/constants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AssetUrlPipe, CountrySelectComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent2 {
public flags: SelectInterface[]=flagsSelection;
public flagsLocation = '/svg/flags/';

}
