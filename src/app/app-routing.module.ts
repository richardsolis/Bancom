import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '',
    loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule)
  },
  { 
    path: 'usuarios',
    loadChildren: () => import('./modules/private/private.module').then(m => m.PrivateModule)
  },
  {
    path: '**',
    redirectTo: '',
    loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
