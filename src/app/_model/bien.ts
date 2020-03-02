import { Categoria } from './categoria';
import { Marca } from './marca';

export class Bien{
    idBien: number;
    codPatrimonial: string;
    codInterno: string;
    nombre: string;
    estadoUso: CharacterData;
    modelo: string;
    tipo: string;
    serie: string;
    dimension: string;
    color: string;
    observaciones: string;
    codLectora: string; // importante. (10)
    estado: CharacterData;

    categoria: Categoria;
    marca: Marca;

}