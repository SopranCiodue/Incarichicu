import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/incarichi/incarichi.routes').then(
        (m) => m.IncarichiRoutes,
      ),
  },
];
