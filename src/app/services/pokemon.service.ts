import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  catchError,
  EMPTY,
  expand,
  map,
  Observable,
  reduce,
  scan,
  tap,
} from 'rxjs';
import { Pokemon } from './pokemon.model';

export type PokemonsDTO = {
  count: number;
  next: string | null;
  previous: string | null;
  results: [{ name: string; url: string }];
};

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  http = inject(HttpClient);

  constructor() {}

  getPokemons$(): Observable<Pokemon[]> {
    return this.http
      .get<PokemonsDTO>('https://pokeapi.co/api/v2/pokemon/')
      .pipe(
        expand((response) => response.next ? this.http.get<PokemonsDTO>(response.next) : EMPTY),
        map((dto) => dto.results.map((pokemon) => new Pokemon(pokemon.url.split('/')[6], pokemon.name, pokemon.url))),
        //@ts-ignore
        reduce((acumulador, pokemons) => [...acumulador, ...pokemons], []),
        tap(console.log)
      );
  }

  getPokemonStadistics(url: string): Observable<any> | undefined {
    return this.http.get(url).pipe();
  }
}
