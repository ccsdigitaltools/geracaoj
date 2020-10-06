import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'grupos',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../grupos/grupos.module').then(m => m.GruposPageModule)
          }
        ]
      },
      {
        path: 'eventos',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../eventos/eventos.module').then(m => m.EventosPageModule)
          }
        ]
      },
      {
        path: 'promos',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../promos/promos.module').then(m => m.PromosPageModule)
          }
        ]
      },
      {
        path: 'noticias',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../noticias/noticias.module').then(m => m.NoticiasPageModule)
          }
        ]
      },
      /*{
        path: 'detalhes/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../detalhes/detalhes.module').then(m => m.DetalhesPageModule)
          }
        ]
      },*/
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
