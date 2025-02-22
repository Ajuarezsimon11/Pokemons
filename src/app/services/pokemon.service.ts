import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Pokemon } from './pokemon.model';

type PokemonsDTO = {
  count: number,
  next: string | null,
  previous: string | null,
  results: Array<object>,
}

type PokemonDTO = {
  name: string,
  url: string,
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  http = inject(HttpClient);

  constructor() {}

  getPokemons$(): Observable<Pokemon[]>{
    return this.http.get<{results: PokemonsDTO[]}>('https://pokeapi.co/api/v2/pokemon/').pipe(
      //@ts-ignore
      map(reponse => reponse.results.map(pokemon => new Pokemon(pokemon.name, pokemon.url))),
      tap(console.log),
    )
  }
}
