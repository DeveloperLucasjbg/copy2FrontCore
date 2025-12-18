import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SelectInterface } from '@avla/ui-design';
import { I18nService } from '@services/generic/i18n.service';
import { TokenService } from '@services/generic/token.service';
import { countriesActive, countryLanguages } from '@shared/constants';
import { AssetUrlPipe } from '@shared/pipes';

@Component({
  selector: 'country-select',
  standalone: true,
  imports: [CommonModule, AssetUrlPipe],
  templateUrl: './country-select.component.html',
})
export class CountrySelectComponent implements OnInit {
  private i18nService = inject(I18nService);
  private router = inject(Router);
  @Input() options: SelectInterface[] = [];
  @Input() imagePath: string = '';
  protected languages = countryLanguages;

  selectedOption: SelectInterface | null = null;
  isDropdownOpen = false;

  @ViewChild('dropdownCountryContainer') dropdownCountryContainer!: ElementRef;

  ngOnInit(): void {
    if (this.options.length > 0) {
      const lang = I18nService.getLang;
      const foundOption = this.options.find(
        (option) => this.languages[option.key] === lang,
      );

      this.selectedOption = foundOption ? foundOption : this.options[0];
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option: SelectInterface) {
    if (this.checkIsActive(option.key) && option.key !== this.selectedOption?.key) {
      this.selectedOption = option;
      this.isDropdownOpen = false;
      const selectedLanguage = this.languages[this.selectedOption.key];
      this.i18nService.setLang(selectedLanguage);
      if (TokenService.isLogged()) {
        // this.router.navigate([HomeComponent.PATH]);
      }
    } else {
      this.isDropdownOpen = false;
    }
  }

  getSvgPath(key?: string): string {
    return `${this.imagePath}${key}.svg`;
  }

  @HostListener('document:mousedown', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (
      this.isDropdownOpen &&
      this.dropdownCountryContainer &&
      !this.dropdownCountryContainer.nativeElement.contains(event.target)
    ) {
      this.isDropdownOpen = false;
    }
  }

  protected checkIsActive(lang: string): boolean {
    const ISO = this.languages[lang];
    return countriesActive.includes(ISO);
  }
}
