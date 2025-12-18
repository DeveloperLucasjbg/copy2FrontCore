import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  HeaderComponent,
  MenuItem,
  SelectComponent,
  SelectInterface,
  UserInfo,
  ImageSelectComponent,
} from "@avla/ui-design";
import { HeaderComponent2 } from "@shared/components/header/header.component";
import { flagsSelection, flagsSelectionLocation } from "@shared/constants";
import { CommonModule } from "@angular/common";
import { AssetUrlPipe } from "../../shared/pipes/asset-url.pipe";
import { SidenavComponent } from "@views/public/home/sidenav/sidenav.component";
import { HomeFooterComponent } from "@views/public/home/home-footer/home-footer.component";
import { navItems } from "@shared/constants";

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent2,
    HeaderComponent,
    CommonModule,
    AssetUrlPipe,
    SidenavComponent,
    HomeFooterComponent
  ],
  templateUrl: './private-layout.component.html',
})
export class PrivateLayoutComponent {
  public flagsLocation = flagsSelectionLocation;
  user: UserInfo = { 
    name: "Daniel Espinoza", 
    avatarUrl: "avatar.svg"
  };
  menuItems: MenuItem[] = [
      { label: 'Guía de uso', value: 'guide' },
      { label: 'Chat de ayuda', value: 'chat' },
      { label: 'Contáctanos', value: 'contact' },
      { label: 'Cambiar contraseña', value: 'change-password' },
  ];
  /* localeOptions: SelectInterface[] = flagsSelection; */
  localeOptions: SelectInterface[] = [
    { key: 'es-CL', value: 'Chile', icon: 'chile' },
    { key: 'es-MX', value: 'Mexico', icon: 'mexico' },
    { key: 'es-PE', value: 'Peru', icon: 'peru' },
    { key: 'en-US', value: 'Usa', icon: 'usa' },
    { key: 'pt-BR', value: 'Brasil', icon: 'brasil' },
  ];
  logoUrl: string = "logo-avla.svg";
  navItems = navItems;

  onLogout() {
    throw new Error("Method not implemented.");
  }

  onMenuClick($event: string) {
    throw new Error("Method not implemented.");
  }

  onLocaleChange($event: string) {
    throw new Error("Method not implemented.");
  }

  onNavItemClick(index: number) {
    // Aquí puedes manejar la lógica cuando se hace click en un item del sidenav
    console.log('Nav item clicked:', index);
  }
}

