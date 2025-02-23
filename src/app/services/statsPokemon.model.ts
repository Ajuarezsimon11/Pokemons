import { Pokemon } from "./pokemon.model";

export class StatsPokemon extends Pokemon {
    constructor(
        id: string,
        nombre: string,
        url: string,
        public readonly altura: number,
        public readonly peso: number,
        public readonly estadisticas: string[],
        public readonly habilidades: string[],
        public readonly tipos: string[],
    ) {
        super(id, nombre, url); // Llamada al constructor de la clase padre
    }
}