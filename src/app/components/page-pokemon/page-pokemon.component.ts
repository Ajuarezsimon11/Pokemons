import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'page-pokemon',
  imports: [CommonModule],
  templateUrl: './page-pokemon.component.html',
  styleUrl: './page-pokemon.component.css'
})
export class PagePokemonComponent {
  statsPokemon = inject(PokemonService);
}
