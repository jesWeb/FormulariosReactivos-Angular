import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    //esta es cuando aun no se importa y por eso el .then
    path: 'reactive',
    loadChildren: () => import('./reactive/reactive.routes').then((m) => m.reactiveRoutes)
  },
  {
    //esta es cuando ya se importo
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes')
  },
  {
    path: 'country',
    loadChildren: () => import('./country/country.routes').then((m) => m.CountryRoutes)
  },
  {
    path:'**',
    redirectTo:'reactive'
  }


];
