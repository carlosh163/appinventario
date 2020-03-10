import { Personal } from '../_model/personal';

export class Usuario{
    idUsuario: number;
    personal: Personal;
    username: string;
    password: string;
    enabled: boolean;
}