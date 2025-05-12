import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/incarichi/incarichi-view/incarichi-view.routes').then(
        (m) => m.IncarichiViewRoutes,
      ),
  },
];
