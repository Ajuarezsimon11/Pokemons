import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'index-page',
  imports: [CommonModule],
  templateUrl: './index-page.component.html',
  styleUrl: './index-page.component.css'
})
export class IndexPageComponent {
  pokemons$: Observable<any>;
  service = inject(PokemonService);

  constructor(){
    this.pokemons$ = this.service.getPokemons$();
  }
}
