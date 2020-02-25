import { Cargo } from './cargo';

export class Personal{
    idPersonal: number;
    nombres: string;
    apellidos: string;
    fechaNac: string;
    dni: string;
    celular: number;
    genero: CharacterData;
    modalidad: CharacterData;
    cargo: Cargo;
}