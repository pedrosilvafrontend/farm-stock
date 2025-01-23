import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'farms',
    pathMatch: 'full'
  },
  {
    path: 'farms',
    loadComponent: () => import('./pages/farms/farms.component').then(m => m.FarmsComponent)
  },
  {
    path: 'stocks',
    loadComponent: () => import('./pages/stocks/stocks.component').then(m => m.StocksComponent)
  },
  {
    path: 'stock-items',
    loadComponent: () => import('./pages/stock-items/stock-items.component').then(m => m.StockItemsComponent)
  },
  {
    path: 'stock-movements',
    loadComponent: () => import('./pages/stock-movements/stock-movements.component').then(m => m.StockMovementsComponent)
  },
  {
    path: '**',
    redirectTo: 'farms'
  }
];
