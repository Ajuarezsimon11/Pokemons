import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'index-page',
  imports: [CommonModule],
  templateUrl: './index-page.component.html',
  styleUrl: './index-page.component.css',
})
export class IndexPageComponent implements OnInit {
  pokemons$: Observable<any>;
  service = inject(PokemonService); // Importamos servicio
  route = inject(Router); // Injectamos la clase para las RUTAS (redireccionamiento)
  activeRoute = inject(ActivatedRoute); // Inyectamos la clase para trabajar con la RUTA en la que nos encontramos
  selectValue: any;
  statPokemons$ = Observable<any>;
  
  constructor() {
    this.pokemons$ = this.service.getPokemons$();
  }
  
  ngOnInit(): void {

  }
  
  getValues(e: Event) {
    // @ts-ignore
    this.selectValue = e.target.value;
    // console.log(this.selectValue);
  }

  showPokemon($event: MouseEvent) {
    if (this.selectValue) {
      this.route.navigate(['pokemon', this.selectValue]);
    } else{

    }
  }
}
