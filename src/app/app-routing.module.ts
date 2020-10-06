import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TutorialGuard } from './guards/tutorial.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [TutorialGuard]
  },
  { path: 'splash', loadChildren: './splash/splash.module#SplashPageModule' },
  { path: 'tutorial', loadChildren: './tutorial/tutorial.module#TutorialPageModule' },
  { path: 'evento-detalhes/:id', loadChildren: './evento-detalhes/evento-detalhes.module#EventoDetalhesPageModule' },
  { path: 'grupo-detalhes/:id', loadChildren: './grupo-detalhes/grupo-detalhes.module#GrupoDetalhesPageModule' },
  { path: 'promo-detalhes/:id', loadChildren: './promo-detalhes/promo-detalhes.module#PromoDetalhesPageModule' },
  { path: 'noticia-detalhes/:id', loadChildren: './noticia-detalhes/noticia-detalhes.module#NoticiaDetalhesPageModule' },
  { path: 'evento-cadastro', loadChildren: './evento-cadastro/evento-cadastro.module#EventoCadastroPageModule' },
  { path: 'grupo-cadastro', loadChildren: './grupo-cadastro/grupo-cadastro.module#GrupoCadastroPageModule' },
  { path: 'promo-cadastro', loadChildren: './promo-cadastro/promo-cadastro.module#PromoCadastroPageModule' },
  { path: 'noticia-cadastro', loadChildren: './noticia-cadastro/noticia-cadastro.module#NoticiaCadastroPageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
