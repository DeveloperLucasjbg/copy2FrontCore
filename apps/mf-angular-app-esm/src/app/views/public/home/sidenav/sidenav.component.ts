import { Component, input, output, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AssetUrlPipe } from '../../../../shared/pipes/asset-url.pipe';
import { NavItem } from '@interfaces/home.interface';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, AssetUrlPipe],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit, OnDestroy {
  items = input.required<NavItem[]>();
  selectedIndex = signal<number | null>(null);
  expandedIndex = signal<number | null>(null);
  itemClick = output<number>();
  
  private router = inject(Router);
  private routerSubscription?: Subscription;

  ngOnInit() {
    // Seleccionar el item inicial basado en la ruta actual
    this.updateSelectedItemFromRoute();
    
    // Cambios de ruta
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateSelectedItemFromRoute();
      });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private updateSelectedItemFromRoute() {
    const currentUrl = this.router.url.split('?')[0]; // Obtener URL 
    const items = this.items();
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      
      if (item.route && currentUrl === item.route) {
        this.selectedIndex.set(i);
        this.expandedIndex.set(null);
        return;
      }
      
      if (item.submenu && item.submenu.length > 0) {
        for (const subItem of item.submenu) {
          if (subItem.route && currentUrl === subItem.route) {
            this.selectedIndex.set(i);
            this.expandedIndex.set(null);
            return;
          }
        }
      }
    }
    
    this.selectedIndex.set(null);
    this.expandedIndex.set(null);
  }

  onItemClick(index: number, item: NavItem) {
    if (item.route) {
      this.selectedIndex.set(index);
      this.itemClick.emit(index);
      this.router.navigate([item.route]);
      return;
    }
    
    if (item.submenu && item.submenu.length > 0) {
      if (this.expandedIndex() === index) {
        this.expandedIndex.set(null);
      } else {
        this.expandedIndex.set(index);
      }
    } else {
      this.selectedIndex.set(index);
      this.itemClick.emit(index);
    }
  }

  onItemHover(index: number, item: NavItem) {
    if (item.submenu && item.submenu.length > 0) {
      this.expandedIndex.set(index);
    }
  }

  onItemLeave(index: number) {
    const expandedIndex = this.expandedIndex();
    if (expandedIndex === index) {
      this.expandedIndex.set(null);
    }
  }

  onSidenavLeave() {
    this.expandedIndex.set(null);
  }

  onSubItemClick(index: number, subIndex: number, subItem: any) {
    this.selectedIndex.set(index);
    this.itemClick.emit(index);
    
    this.expandedIndex.set(null);
    
    if (subItem.route) {
      this.router.navigate([subItem.route]);
    }
    
    if (subItem.action) {
      subItem.action();
    }
  }

  isItemSelected(index: number): boolean {
    return this.selectedIndex() === index;
  }

  isExpanded(index: number): boolean {
    return this.expandedIndex() === index;
  }

  hasSubmenu(item: NavItem): boolean {
    return !!(item.submenu && item.submenu.length > 0);
  }
}
