import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'calculator',
    loadComponent: () => import('@/components/dashboard/dashboard.component'),
  },
  { path: '**', redirectTo: 'calculator' },
];
