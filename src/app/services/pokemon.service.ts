import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EMPTY, expand, map, Observable, reduce, tap, } from 'rxjs';
import { Pokemon } from './pokemon.model';
import { StatsPokemon } from './statsPokemon.model';

export type PokemonDTO = {
  count: number;
  next: string | null;
  previous: string | null;
  results: [{ name: string; url: string }];
};

export type StatsPokemonDTO = {
  abilities : object,
  baseExperience: number,
  cries: object,
  forms: Array<object>,
  gameIndices: Array<object>,
  height : number,
  heldItems: Array<object>;
  id : number,
  is_default: boolean,
  location_area_encounters: string,
  moves: Array<object>,
  name : string,
  order: number,
  past_abilities: Array<object>,
  past_types: Array<object>,
  species: object,
  sprites: object,
  stats : Array<object>,
  types: Array<object>,
  weight: number,
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  http = inject(HttpClient);
  private endPoint = 'https://pokeapi.co/api/v2/pokemon/';

  constructor() {}

  getPokemons$(): Observable<Pokemon[]> {
    return this.http
      .get<PokemonDTO>(this.endPoint)
      .pipe(
        expand((response) => response.next ? this.http.get<PokemonDTO>(response.next) : EMPTY), //
        map((dto) => dto.results.map((pokemon) => new Pokemon(pokemon.url.split('/')[6], pokemon.name, pokemon.url))),
        //@ts-ignore
        reduce((acumulador, pokemons) => [...acumulador, ...pokemons], []), //
        // tap(console.log)
      );
  }

  getPokemonStadistics$(url: string): Observable<StatsPokemon> {
    return this.http.get<StatsPokemon>(`${this.endPoint}${url}`).pipe(
      tap(console.log),
      map((pokemonStats) => new StatsPokemon(
        pokemonStats.id, 
        pokemonStats.name,
        url,
        pokemonStats.height,
        pokemonStats.weight,
        pokemonStats.stats ? pokemonStats.stats.map((stat: { stat: { name: any; }; }) => stat.stat.name) : [],
        pokemonStats.moves ? pokemonStats.moves.map((move: { move: { name: any; }; }) => move.move.name) : [],
        pokemonStats.types ? pokemonStats.types.map((type: { type: { name: any; }; }) => type.type.name) : [],
      )),
      tap(console.log),
    );
  }
}
