import { Routes } from '@angular/router';
import { IndexPageComponent } from './components/index-page/index-page.component';
import { PagePokemonComponent } from './components/page-pokemon/page-pokemon.component';
import { Page404Component } from './components/page-404/page-404.component';

export const routes: Routes = [
    {path: '', redirectTo: 'inicio', pathMatch: 'full'},
    {path: 'inicio', component: IndexPageComponent},
    {path: 'pokemon/:pokemondId',component: PagePokemonComponent},
    {path: '**', component: Page404Component},
];
